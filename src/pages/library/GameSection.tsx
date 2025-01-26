import { createResource } from 'solid-js';

import MoreIcon from '@/icons/MoreIcon';
import { user } from '@/store/auth';
import { format } from 'date-fns';

import {
	Popover,
	PopoverMenu,
	PopoverProvider,
	PopoverTrigger
} from '@/components/ui/popover';

import { fetchData } from '@/lib/api';
import { Achievement, BackendMessage, Game, Review } from '@/lib/types';

import AchievementsSection from './AchievementsSection';
import ReviewsSection from './ReviewSection';

const fetchUserAchievements = async (
	gameId: number,
	userId: number
): Promise<Achievement[] | undefined> => {
	try {
		const res = await fetchData<Achievement[]>(
			`/me/achievements/${gameId}?user_id=${userId}`
		);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const fetchReviews = async (gameId: string): Promise<Review[] | undefined> => {
	try {
		const res = await fetchData<Review[]>(`/reviews/game/${gameId}`);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const removeGame = async (
	userId: number,
	gameId: number
): Promise<BackendMessage | undefined> => {
	try {
		const message = await fetchData<BackendMessage>(
			`/me/games/${gameId}?user_id=${userId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return message;
	} catch (error) {
		console.error(error);
	}
};

interface Props {
	game: Game;
	refetchLibrary: () => void;
}

const GameSection = (props: Props) => {
	const [userAchievements] = createResource(
		() => [Number(props.game.game_id), Number(user()?.user_id)],
		([gameId, userId]) => fetchUserAchievements(gameId, userId)
	);
	const [reviews, { refetch }] = createResource(
		() => props.game.game_id,
		fetchReviews
	);

	const handleRemove = () => {
		if (!user()?.user_id) return;

		removeGame(Number(user()?.user_id), Number(props.game.game_id));
		props.refetchLibrary();
	};

	return (
		<div class="flex flex-col">
			<div class="relative h-96 w-full overflow-hidden">
				<img
					src={props.game.cover_image}
					alt={props.game.title}
					class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
				<div class="pointer-events-none absolute bottom-0 z-0 h-1/2 w-full bg-gradient-to-b from-transparent to-black/80" />
				<div class="rounded-xs pointer-events-none absolute bottom-6 right-0 bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0">
					{props.game.genre}
				</div>
			</div>

			<div class="bg-[#1B1B1B] px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-6">
						<button class="h-12 rounded-md bg-green-600 px-6 text-lg font-semibold text-white shadow-sm transition-all hover:bg-green-500">
							Play
						</button>
						<h1 class="text-3xl font-bold">{props.game.title}</h1>
					</div>
					<div class="flex items-center gap-5">
						<div class="flex flex-col">
							<span class="text-end text-sm font-medium text-white">
								{props.game.developer}
							</span>
							<span class="text-sm font-medium">
								{format(new Date(props.game.release_date), 'MMM dd, yyyy')}
							</span>
						</div>
						<PopoverProvider>
							<Popover>
								<PopoverTrigger class="p-0">
									<button class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700">
										<MoreIcon class="h-5 w-5" />
									</button>
								</PopoverTrigger>
								<PopoverMenu>
									<button
										class="h-8 w-48 rounded-md px-4 text-start text-white transition-all duration-300 hover:bg-white/20"
										onClick={handleRemove}
									>
										Remove from Library
									</button>
								</PopoverMenu>
							</Popover>
						</PopoverProvider>
					</div>
				</div>

				<p class="mt-4 text-gray-300">{props.game.description}</p>

				<AchievementsSection
					achievements={userAchievements()}
					isLoading={userAchievements.loading}
				/>
				<ReviewsSection
					reviews={reviews()}
					refetch={refetch}
					gameId={props.game.game_id}
					isLoading={reviews.loading}
				/>
			</div>
		</div>
	);
};

export default GameSection;
