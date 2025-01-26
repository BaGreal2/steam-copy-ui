import { For, Show } from 'solid-js';

import AchievementItem from '@/components/achievement-item';

import { Achievement } from '@/lib/types';

const NoAchievements = () => {
	return (
		<div class="text-lg font-medium text-gray-400">No achievements yet...</div>
	);
};

interface Props {
	achievements: Achievement[] | undefined;
	isLoading: boolean;
}

const AchievementsSection = (props: Props) => {
	return (
		<div class="mt-6 flex flex-col gap-4 text-white">
			<h1 class="text-2xl font-semibold">Achievements</h1>
			<div class="flex flex-col gap-3">
				<Show
					when={
						(props.achievements && props.achievements.length !== 0) ||
						props.isLoading
					}
					fallback={<NoAchievements />}
				>
					<For
						each={props.achievements}
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

export default AchievementsSection;
