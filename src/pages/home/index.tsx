import { useNavigate } from '@solidjs/router';
import { createEffect, createResource, For, Show } from 'solid-js';

import { user } from '@/store/auth';

import GameCard from '@/components/game-card';

import { fetchData } from '@/lib/api';
import { Game } from '@/lib/types';

const fetchGames = async (
	userId: string | undefined
): Promise<Game[] | undefined> => {
	try {
		let query = '/games';
		console.log('userId', userId);
		if (userId) {
			query += `?user_id=${userId}`;
		}
		const res = await fetchData<Game[]>(query);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Home = () => {
	const navigate = useNavigate();
	const [data, { refetch }] = createResource(() => user()?.user_id, fetchGames);

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

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
						{(game) => <GameCard game={game} refetchGames={refetch} />}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default Home;
