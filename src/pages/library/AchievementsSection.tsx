import { For, Show } from 'solid-js';

import { Achievement } from '@/lib/types';

const NoAchievements = () => {
	return (
		<div class="text-2xl font-medium text-white">No achievements yet...</div>
	);
};

interface Props {
	achievements: Achievement[] | undefined;
	isLoading: boolean;
}

const AchievementsSection = (props: Props) => {
	return (
		<div class="mt-4 flex flex-col gap-2 text-white">
			<h1 class="text-2xl font-bold">Achievements</h1>
			<div class="flex flex-col gap-1">
				<Show
					when={
						props.achievements &&
						props.achievements.length !== 0 &&
						!props.isLoading
					}
					fallback={<NoAchievements />}
				>
					<For
						each={props.achievements}
						fallback={
							<div class="text-2xl font-bold text-white">Loading...</div>
						}
					>
						{(achievement) => (
							<div class="flex w-96 flex-col rounded-md bg-white/10 px-4 py-2">
								<div class="flex justify-between text-lg">
									<span class="font-medium">{achievement.name}</span>
									<span>{achievement.points} Points</span>
								</div>
								<span class="text">{achievement.description}</span>
							</div>
						)}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default AchievementsSection;
