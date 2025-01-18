import { Game } from '@/lib/types';

interface Props {
	game: Game;
	onGameChange: (gameId: string) => void;
}

const GameItem = (props: Props) => {
	return (
		<button
			class="flex w-full cursor-pointer items-center px-2 py-1 transition-all duration-300 hover:bg-white/10"
			onClick={() => props.onGameChange(props.game.game_id)}
		>
			<img
				src={props.game.icon_image}
				alt={props.game.title}
				class="h-4 w-4"
			/>
			<h3 class="ml-4 font-semibold text-white">{props.game.title}</h3>
		</button>
	);
};

export default GameItem;
