import { Game } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
	game: Game;
	isActive: boolean;
	onGameChange: (gameId: string) => void;
}

const PostedGameItem = (props: Props) => {
	return (
		<button
			class={cn(
				'flex w-44 shrink-0 flex-col items-center rounded-lg px-4 py-3 transition-all duration-300',
				props.isActive
					? 'bg-[#3A3A3A] text-white shadow-md'
					: 'bg-[#252525] text-gray-300 hover:bg-[#333333] hover:text-white'
			)}
			onClick={() => props.onGameChange(props.game.game_id)}
		>
			<img
				src={props.game.icon_image}
				alt={props.game.title}
				class="h-44 w-full rounded-md object-cover"
			/>
			<h3 class="mt-2 font-semibold">{props.game.title}</h3>
		</button>
	);
};

export default PostedGameItem;
