import { For } from 'solid-js';

import { Game } from '@/lib/types';

import GameItem from './GameItem';

interface Props {
	games: Game[];
	activeGameId: string | null;
	onGameChange: (gameId: string) => void;
}

const GameList = (props: Props) => {
	return (
		<For
			each={props.games}
			fallback={<div class="text-lg font-medium text-white">Loading...</div>}
		>
			{(game) => (
				<GameItem
					game={game}
					isActive={game.game_id === props.activeGameId}
					onGameChange={props.onGameChange}
				/>
			)}
		</For>
	);
};

export default GameList;
