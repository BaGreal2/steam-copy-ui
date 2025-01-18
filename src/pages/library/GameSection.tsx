import { createResource, Show } from 'solid-js';

import { fetchData } from '@/lib/api';
import { Achievement, Game, Review } from '@/lib/types';

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

interface Props {
	game: Game;
}

const GameSection = (props: Props) => {
	const [achievements] = createResource(props.game.game_id, fetchAchievements);
	const [reviews, { refetch }] = createResource(
		props.game.game_id,
		fetchReviews
	);

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
				<div class="mt-4 flex items-center gap-5">
					<button class="h-12 w-24 rounded-md bg-green-800 text-xl font-semibold text-white transition-all duration-300 hover:bg-green-700">
						Play
					</button>
					<h1 class="text-4xl font-bold text-white">{props.game.title}</h1>
				</div>
				<div class="mt-2 w-full">
					<p class="text-xl font-medium text-white">{props.game.description}</p>
				</div>
				<Show when={achievements()} fallback={<div>Loading...</div>}>
					<AchievementsSection achievements={achievements()!} />
				</Show>
				<Show when={reviews()} fallback={<div>Loading...</div>}>
					<ReviewsSection
						reviews={reviews()!}
						refetch={refetch}
						gameId={props.game.game_id}
					/>
				</Show>
			</div>
		</div>
	);
};

export default GameSection;
