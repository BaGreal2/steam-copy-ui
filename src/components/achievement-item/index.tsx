interface Props {
	name: string;
	points: string;
	description: string;
}

const AchievementItem = (props: Props) => {
	return (
		<div class="flex w-full max-w-[600px] flex-col rounded-lg border border-gray-700 bg-[#2c2c2c] px-5 py-4 shadow-md hover:shadow-lg">
			<div class="flex justify-between text-base text-gray-200">
				<span class="font-semibold">{props.name}</span>
				<span class="text-sm text-emerald-500">{props.points} Points</span>
			</div>
			<span class="mt-2 text-sm text-gray-400">{props.description}</span>
		</div>
	);
};

export default AchievementItem;
