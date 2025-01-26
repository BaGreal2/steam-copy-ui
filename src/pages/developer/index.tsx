import { useNavigate } from '@solidjs/router';
import { createEffect, createResource, createSignal, Show } from 'solid-js';

import { user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { Game } from '@/lib/types';

import AddAchievement from './AddAchievement';
import PostGame from './PostGame';
import PostedGameList from './PostedGameList';

const fetchPosted = async (userId: number): Promise<Game[] | undefined> => {
	try {
		const res = await fetchData<Game[]>(`/me/posted-games?user_id=${userId}`);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Developer = () => {
	const navigate = useNavigate();
	const [activeGameId, setActiveGameId] = createSignal<string | null>(null);
	const [postingGame, setPostingGame] = createSignal<boolean>(false);
	const [postedGames, { refetch }] = createResource(
		() => Number(user()?.user_id),
		fetchPosted
	);

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	const handleGameChange = (gameId: string | null) => {
		setPostingGame(false);
		setActiveGameId(gameId);
	};

	return (
		<div class="flex w-full flex-col items-center bg-[#101010] p-6 text-white">
			<h1 class="mb-8 text-3xl font-bold">Developer Dashboard</h1>
			<div class="mb-8 w-full max-w-screen-lg rounded-md bg-white/10">
				<PostedGameList
					games={postedGames()!}
					activeGameId={activeGameId()}
					isLoading={postedGames.loading}
					onGameChange={handleGameChange}
					postingGame={postingGame()}
					setPostingGame={setPostingGame}
				/>
			</div>

			<Show when={postingGame()}>
				<PostGame refetchPosted={refetch} />
			</Show>

			<Show when={!postingGame()}>
				<AddAchievement activeGameId={activeGameId()} />
			</Show>
		</div>
	);
};

export default Developer;
