import { For, Resource } from 'solid-js';

import { Game } from '@/lib/types';

import GameItem from './GameItem';

interface Props {
	games: Resource<Game[] | undefined>;
	onGameChange: (gameId: string) => void;
}

const GameList = (props: Props) => {
	return (
		<For each={props.games()} fallback={<div>Loading...</div>}>
			{(game) => <GameItem game={game} onGameChange={props.onGameChange} />}
		</For>
	);
};

export default GameList;
