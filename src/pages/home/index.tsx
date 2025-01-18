import { createResource, For } from 'solid-js';

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
		<div class="flex h-full w-full grow bg-[#101010] p-4">
			<div class="flex h-fit w-full flex-wrap justify-center gap-6">
				<For each={data()} fallback={<div>Loading...</div>}>
					{(game) => <GameCard {...game} />}
				</For>
			</div>
		</div>
	);
};

export default Home;
