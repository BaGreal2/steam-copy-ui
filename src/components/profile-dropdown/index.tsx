import { A } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';

import { setUser } from '@/store/auth';

import { User } from '@/lib/types';

interface Props {
	user: User;
}

const ProfileDropdown = ({ user }: Props) => {
	const [isOpen, setIsOpen] = createSignal(false);

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<div class="relative">
			<div
				class="size-10 cursor-pointer overflow-hidden rounded-full"
				onClick={() => setIsOpen(!isOpen())}
			>
				<img
					src={user.profile_image}
					class="size-full object-cover object-center"
					alt="Avatar"
				/>
			</div>
			<Show when={isOpen()}>
				<div
					class="absolute right-0 top-12 z-10 flex w-44 flex-col gap-1 rounded-md bg-black/50 px-2.5 py-2 shadow-md backdrop-blur-md"
					onClick={() => setIsOpen(false)}
				>
					<A
						href="/profile"
						class="flex h-8 w-full items-center rounded-md px-4 text-start text-white transition-all duration-300 hover:bg-white/20"
					>
						Profile
					</A>
					<button
						class="h-8 w-full rounded-md px-4 text-start text-white transition-all duration-300 hover:bg-white/20"
						onClick={logout}
					>
						Logout
					</button>
				</div>
				<button
					class="fixed left-0 top-0 z-0 size-full"
					onClick={() => setIsOpen(false)}
				/>
			</Show>
		</div>
	);
};

export default ProfileDropdown;
