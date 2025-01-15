import { createResource, For } from 'solid-js';

import GameCard from '@/components/game-card';

import { fetchData } from '@/lib/api';

const fetchGames = async () => {
	try {
		const res = await fetchData('/games');
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Home = () => {
	const [data] = createResource(fetchGames);

	return (
		<div class="p-4 grow h-full flex w-full bg-blue-900">
			<div class="flex gap-6 h-fit flex-wrap w-full">
				<For each={data()} fallback={<div>Loading...</div>}>
					{(game) => <GameCard {...game} />}
				</For>
			</div>
		</div>
	);
};

export default Home;
