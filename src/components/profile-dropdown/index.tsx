import { A } from '@solidjs/router';

import { setUser } from '@/store/auth';

import { User } from '@/lib/types';

import {
	Popover,
	PopoverMenu,
	PopoverProvider,
	PopoverTrigger
} from '../ui/popover';

interface Props {
	user: User;
}

const ProfileDropdown = ({ user }: Props) => {
	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<PopoverProvider>
			<Popover>
				<PopoverTrigger class="size-10 cursor-pointer overflow-hidden rounded-full">
					<img
						src={user.profile_image}
						class="size-full object-cover object-center"
						alt="Avatar"
					/>
				</PopoverTrigger>
				<PopoverMenu class="w-44">
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
				</PopoverMenu>
			</Popover>
		</PopoverProvider>
	);
};

export default ProfileDropdown;
