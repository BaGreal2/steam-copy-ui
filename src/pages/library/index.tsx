import { useNavigate } from '@solidjs/router';
import {
	createEffect,
	createMemo,
	createResource,
	createSignal,
	Show
} from 'solid-js';

import { user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { Game } from '@/lib/types';

import GameList from './GameList';
import GameSection from './GameSection';

export const fetchLibrary = async (
	userId: number
): Promise<Game[] | undefined> => {
	try {
		const res = await fetchData<Game[]>(`/me/games?user_id=${userId}`);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Library = () => {
	const navigate = useNavigate();
	const [activeGameId, setActiveGameId] = createSignal<string | null>(null);
	const [library, { refetch }] = createResource(
		() => Number(user()?.user_id),
		fetchLibrary
	);

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	createEffect(() => {
		if (library() && !activeGameId()) {
			const firstGame = library()?.[0];
			if (firstGame) {
				setActiveGameId(firstGame.game_id);
			}
		}
	});

	const handleGameChange = (gameId: string) => {
		setActiveGameId(gameId);
	};

	const activeGame = createMemo(() => {
		return library()?.find((game) => game.game_id === activeGameId());
	});

	return (
		<div class="flex h-[calc(100vh-64px)] w-full grow bg-[#1B1B1B] text-white">
			<div class="h-full min-w-64 max-w-72 basis-1/4 bg-[#252525] p-4">
				<Show
					when={(library() && library()?.length !== 0) || library.loading}
					fallback={
						<div class="text-lg font-medium text-gray-400">
							No Games in the Library yet.
						</div>
					}
				>
					<GameList
						games={library()!}
						activeGameId={activeGameId()}
						onGameChange={handleGameChange}
					/>
				</Show>
			</div>

			<div class="h-full grow overflow-y-scroll">
				<Show when={activeGame()}>
					<GameSection game={activeGame()!} refetchLibrary={refetch} />
				</Show>
			</div>
		</div>
	);
};

export default Library;
