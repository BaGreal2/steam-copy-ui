import { createResource, Show } from 'solid-js';

import MoreIcon from '@/icons/MoreIcon';
import { user } from '@/store/auth';

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
	const [achievements] = createResource(
		() => props.game.game_id,
		fetchAchievements
	);
	const [reviews, { refetch }] = createResource(
		() => props.game.game_id,
		fetchReviews
	);

	const handleRemove = () => {
		if (!user()?.user_id) {
			return;
		}

		removeGame(Number(user()?.user_id), Number(props.game.game_id));
		props.refetchLibrary();
	};

	return (
		<div class="group flex size-full flex-col">
			<div class="relative h-96 w-full shrink-0 overflow-hidden">
				<img
					src={props.game.cover_image}
					alt={props.game.title}
					class="relative z-0 h-96 w-full object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-105"
				/>
				<div class="absolute bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-black to-transparent transition-all duration-300 ease-in-out group-hover:h-24" />
			</div>
			<div class="flex flex-col px-4 pb-4">
				<div class="mt-4 flex justify-between">
					<div class="flex items-center gap-5">
						<button class="h-12 w-24 rounded-md bg-green-800 text-xl font-semibold text-white transition-all duration-300 hover:bg-green-700">
							Play
						</button>
						<h1 class="text-4xl font-bold text-white">{props.game.title}</h1>
					</div>
					<PopoverProvider>
						<Popover>
							<PopoverTrigger>
								<button class="flex size-10 items-center justify-center rounded-md bg-white/10 transition-all duration-300 hover:bg-white/15">
									<MoreIcon class="size-6 text-white" />
								</button>
							</PopoverTrigger>
							<PopoverMenu class="bg-white/10">
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
				<div class="mt-2 w-full">
					<p class="text-xl font-medium text-white">{props.game.description}</p>
				</div>
				<AchievementsSection
					achievements={achievements()}
					isLoading={achievements.loading}
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
