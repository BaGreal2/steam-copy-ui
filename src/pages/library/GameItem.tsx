import { Game } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
	game: Game;
	isActive: boolean;
	onGameChange: (gameId: string) => void;
}

const GameItem = (props: Props) => {
	return (
		<button
			class={cn(
				'flex w-full items-center rounded-lg px-4 py-2 transition-all duration-300',
				props.isActive
					? 'bg-[#3A3A3A] text-white shadow-md'
					: 'bg-[#252525] text-gray-300 hover:bg-[#333333] hover:text-white'
			)}
			onClick={() => props.onGameChange(props.game.game_id)}
		>
			<img
				src={props.game.icon_image}
				alt={props.game.title}
				class="h-10 w-10 rounded-md object-cover"
			/>
			<h1 class="ml-4 text-sm text-start font-semibold">{props.game.title}</h1>
		</button>
	);
};

export default GameItem;
