import { user } from '@/store/auth';
import { format } from 'date-fns';

import { fetchData } from '@/lib/api';
import { BackendMessage, Game } from '@/lib/types';

const buyGame = async (
	userId: number,
	gameId: number
): Promise<BackendMessage | undefined> => {
	try {
		const message = await fetchData<BackendMessage>('/me/games', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: userId,
				game_id: gameId
			})
		});
		return message;
	} catch (error) {
		console.error(error);
	}
};

interface Props extends Game {}

const GameCard = ({
	game_id,
	title,
	genre,
	description,
	price,
	developer,
	release_date,
	cover_image
}: Props) => {
	const handleBuy = () => {
		if (!user()?.user_id) {
			return;
		}

		buyGame(Number(user()?.user_id), Number(game_id));
	};

	return (
		<div class="group flex h-80 w-96 cursor-pointer flex-col gap-4 rounded-md bg-white/10 p-3 shadow-lg transition-all duration-150 hover:shadow-xl">
			<div class="relative h-1/2 w-full overflow-hidden rounded-md">
				<img
					src={cover_image}
					class="h-full w-full object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-105"
					alt="Cover Image"
				/>
				<div class="rounded-xs absolute right-0 top-1 translate-x-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0">
					{genre}
				</div>
			</div>
			<div class="flex grow flex-col justify-between">
				<div class="flex w-full items-center justify-between">
					<h1 class="text-lg font-semibold leading-5 text-white">{title}</h1>
					<span class="rounded-md bg-black/30 px-2 py-1 text-end text-xs capitalize leading-4 text-white">
						{price}
					</span>
				</div>
				<div class="mt-2 flex w-full justify-between">
					<span class="line-clamp-2 max-h-8 overflow-hidden overflow-ellipsis text-sm leading-4 text-white">
						{description}
					</span>
					<div class="flex w-40 flex-col">
						<span class="text-end text-sm font-medium text-white">
							{developer}
						</span>
						<span class="text-end text-xs text-white">
							{format(new Date(release_date), 'MMM dd, yyyy')}
						</span>
					</div>
				</div>
				<button
					class="mt-2 h-10 w-full rounded-md bg-black/40 text-sm font-medium text-white shadow-md transition-all duration-150 hover:bg-black/20"
					onClick={handleBuy}
				>
					Buy Now
				</button>
			</div>
		</div>
	);
};

export default GameCard;
