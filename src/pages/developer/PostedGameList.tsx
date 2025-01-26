import { createEffect, For } from 'solid-js';

import PlusIcon from '@/icons/PlusIcon';

import { Game } from '@/lib/types';
import { cn } from '@/lib/utils';

import PostedGameItem from './PostedGameItem';

interface Props {
	games: Game[];
	activeGameId: string | null;
	postingGame: boolean;
	onGameChange: (gameId: string | null) => void;
	setPostingGame: (value: boolean) => void;
}

const PostedGameList = (props: Props) => {
	const handleEnablePosting = () => {
		props.onGameChange(null);
		props.setPostingGame(true);
	};

	return (
		<div class="flex gap-2 overflow-x-auto px-4 py-4">
			<button
				class={cn(
					'flex w-44 shrink-0 flex-col items-center justify-center rounded-lg transition-all duration-300',
					props.postingGame
						? 'bg-[#3A3A3A] text-white shadow-md'
						: 'bg-[#252525] text-gray-300 hover:bg-[#333333] hover:text-white'
				)}
				onClick={handleEnablePosting}
			>
				<PlusIcon className="size-10 text-white/80" />
			</button>
			<For
				each={props.games?.sort(
					(a, b) =>
						new Date(b.release_date).getTime() -
						new Date(a.release_date).getTime()
				)}
				fallback={
					<div class="text-lg font-medium text-gray-400">Loading...</div>
				}
			>
				{(game) => (
					<PostedGameItem
						game={game}
						isActive={game.game_id === props.activeGameId}
						onGameChange={props.onGameChange}
					/>
				)}
			</For>
		</div>
	);
};

export default PostedGameList;
