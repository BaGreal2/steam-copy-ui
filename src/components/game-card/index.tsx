import { format } from 'date-fns';

import { Game } from '@/lib/types';

interface Props extends Game {}

const GameCard = ({
	title,
	genre,
	developer,
	release_date,
	cover_image
}: Props) => {
	return (
		<div class="w-96 h-80 p-3 bg-blue-950 group flex flex-col gap-4 rounded-md shadow-lg hover:shadow-xl duration-150 transition-all">
			<div class="w-full h-2/3 rounded-md overflow-hidden">
				<img
					src={cover_image}
					class="w-full h-full object-cover group-hover:scale-105 object-center duration-300 ease-in-out transition-all"
					alt="Cover Image"
				/>
			</div>
			<div class="grow flex flex-col justify-between">
				<div class="w-full flex justify-between items-start">
					<h1 class="text-lg leading-5 text-white font-semibold">{title}</h1>
					<span class="text-xs leading-4 text-end text-white">{genre}</span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-medium text-white text-end">
						{developer}
					</span>
					<span class="text-xs text-white text-end">
						{format(new Date(release_date), 'MMM dd, yyyy')}
					</span>
				</div>
				<button class="mt-2 bg-blue-800 w-full h-10 rounded-md text-white text-sm font-medium shadow-md hover:bg-blue-900 duration-150 transition-all">
					Buy Now
				</button>
			</div>
		</div>
	);
};

export default GameCard;
