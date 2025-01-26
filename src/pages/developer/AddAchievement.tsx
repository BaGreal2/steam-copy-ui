import { createResource, createSignal, For, Show } from 'solid-js';

import AchievementItem from '@/components/achievement-item';

import { fetchData } from '@/lib/api';
import { Achievement, BackendMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

const fetchAchievements = async (
	gameId: string
): Promise<Achievement[] | undefined> => {
	try {
		const res = await fetchData<Achievement[]>(`/achievements/game/${gameId}`);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const postAchievement = async (
	name: string,
	description: string,
	points: number,
	game_id: number
): Promise<BackendMessage | undefined> => {
	try {
		const res = await fetchData<BackendMessage>('/achievements', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, description, points, game_id })
		});
		return res;
	} catch (error) {
		console.error(error);
	}
};

const NoAchievements = () => {
	return (
		<div class="text-lg font-medium text-gray-400">No achievements yet...</div>
	);
};

interface Props {
	activeGameId: string | null;
}

const AddAchievement = (props: Props) => {
	const [achievements, { refetch }] = createResource(
		() => props.activeGameId,
		fetchAchievements
	);
	const [name, setName] = createSignal('');
	const [description, setDescription] = createSignal('');
	const [points, setPoints] = createSignal(0);

	const handleResetForm = () => {
		setName('');
		setDescription('');
		setPoints(0);
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if (!props.activeGameId) {
			return;
		}
		postAchievement(
			name(),
			description(),
			points(),
			Number(props.activeGameId)
		);

		handleResetForm();
		refetch();
	};

	return (
		<div
			class={cn(
				'flex w-full max-w-screen-lg gap-4',
				props.activeGameId ? 'opacity-100' : 'pointer-events-none opacity-50'
			)}
		>
			<div class="basis-3/5 rounded-md bg-white/10 p-6 shadow-lg transition-opacity duration-300">
				<h2 class="mb-4 text-xl font-semibold">Add Achievements</h2>
				<p class="mb-4 text-sm text-gray-400">
					You can add achievements for a selected game.
				</p>

				<form class="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div class="flex flex-col">
						<label class="mb-1 text-sm font-medium">Name</label>
						<input
							type="text"
							value={name()}
							onChange={(e) => setName(e.currentTarget.value)}
							class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter achievement name"
						/>
					</div>

					<div class="flex flex-col">
						<label class="mb-1 text-sm font-medium">Description</label>
						<textarea
							value={description()}
							onChange={(e) => setDescription(e.currentTarget.value)}
							class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter achievement description"
							rows={3}
						></textarea>
					</div>

					<div class="flex flex-col">
						<label class="mb-1 text-sm font-medium">Points</label>
						<input
							type="number"
							value={points()}
							onChange={(e) => setPoints(Number(e.currentTarget.value))}
							class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter points for the achievement"
						/>
					</div>

					<button
						type="submit"
						class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-400"
					>
						Add Achievement
					</button>
				</form>
			</div>
			<div class="flex basis-2/5 flex-col gap-2 rounded-md bg-white/10 p-6 shadow-lg transition-opacity duration-300">
				<Show
					when={
						achievements() &&
						achievements()?.length !== 0 &&
						!achievements.loading
					}
					fallback={<NoAchievements />}
				>
					<For
						each={achievements()?.sort(
							(a, b) => Number(a.points) - Number(b.points)
						)}
						fallback={
							<div class="text-lg font-medium text-gray-400">Loading...</div>
						}
					>
						{(achievement) => <AchievementItem {...achievement} />}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default AddAchievement;
