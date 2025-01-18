import { useNavigate } from '@solidjs/router';
import {
	createComputed,
	createEffect,
	createMemo,
	createResource,
	createSignal,
	For
} from 'solid-js';

import { user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { Game } from '@/lib/types';

import GameList from './GameList';
import GameSection from './GameSection';

const fetchLibrary = async (userId: number): Promise<Game[] | undefined> => {
	try {
		console.log('userId', userId);
		const res = await fetchData<Game[]>(`/me/games?user_id=${userId}`);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const Library = () => {
	const [data] = createResource(Number(user()?.user_id), fetchLibrary);
	const navigate = useNavigate();
	const [activeGameId, setActiveGameId] = createSignal<string | null>(null);

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	const handleGameChange = (gameId: string) => {
		console.log('gameId', gameId);
		setActiveGameId(gameId);
	};

	const activeGame = () => {
		return data()?.find((game) => game.game_id === activeGameId());
	};

	return (
		<div class="flex h-[calc(100vh-64px)] w-full grow bg-[#101010]">
			<div class="h-full min-w-64 basis-1/4 max-w-72 bg-white/10">
				<GameList games={data} onGameChange={handleGameChange} />
			</div>
			<div class="h-full grow overflow-y-scroll">
				{activeGame() && <GameSection game={activeGame()!} />}
			</div>
		</div>
	);
};

export default Library;
