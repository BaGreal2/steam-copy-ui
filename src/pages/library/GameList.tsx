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
		<div class="flex flex-col gap-2">
			<For
				each={props.games}
				fallback={
					<div class="text-lg font-medium text-gray-400">Loading...</div>
				}
			>
				{(game) => (
					<GameItem
						game={game}
						isActive={game.game_id === props.activeGameId}
						onGameChange={props.onGameChange}
					/>
				)}
			</For>
		</div>
	);
};

export default GameList;
