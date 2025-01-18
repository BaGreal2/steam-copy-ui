import { For } from 'solid-js';

import { Achievement } from '@/lib/types';

interface Props {
	achievements: Achievement[];
}

const AchievementsSection = (props: Props) => {
	return (
		<div class="mt-4 flex flex-col gap-2 text-white">
			<h1 class="text-2xl font-bold">Achievements</h1>
			<div class="flex flex-col gap-1">
				<For each={props.achievements} fallback={<div>Loading...</div>}>
					{(achievement) => (
						<div class="flex w-96 flex-col rounded-md bg-white/10 px-4 py-2">
							<div class="flex justify-between text-lg">
								<span class="font-medium">{achievement.name}</span>
								<span>{achievement.points}P</span>
							</div>
							<span class="text">{achievement.description}</span>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export default AchievementsSection;
