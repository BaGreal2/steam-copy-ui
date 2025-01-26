import { createResource, For, Show } from 'solid-js';

import GameCard from '@/components/game-card';

import { fetchData } from '@/lib/api';
import { Game } from '@/lib/types';

const fetchGames = async (): Promise<Game[] | undefined> => {
	try {
		const res = await fetchData<Game[]>('/games');
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Home = () => {
	const [data] = createResource(fetchGames);

	return (
		<div class="flex w-full grow flex-col items-center bg-[#101010] p-6">
			<div class="flex w-full max-w-screen-xl flex-wrap justify-center gap-8">
				<Show
					when={(data() && data()?.length !== 0) || data.loading}
					fallback={
						<div class="text-lg font-medium text-gray-400">
							Sorry, nothing here yet :(
						</div>
					}
				>
					<For
						each={data()}
						fallback={
							<div class="text-lg font-medium text-gray-400">Loading...</div>
						}
					>
						{(game) => <GameCard {...game} />}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default Home;
