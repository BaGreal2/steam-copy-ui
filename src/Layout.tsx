import { For, JSX } from 'solid-js';

import NavLink from '@/components/ui/nav-link';

import ProfileDropdown from './components/profile-dropdown';
import { user } from './store/auth';

interface NavLinkType {
	label: string;
	href: string;
}

const NAV_LINKS: NavLinkType[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Library', href: '/library' },
	{ label: 'Developer', href: '/developer' }
];

interface Props {
	children?: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<main class="flex min-h-screen w-full flex-col bg-[#101010] text-white">
			<nav class="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-white/10 px-10 shadow-lg backdrop-blur-md">
				<ul class="flex items-center gap-6">
					<For each={NAV_LINKS}>{(navLink) => <NavLink {...navLink} />}</For>
				</ul>
				{user() ? (
					<ProfileDropdown user={user()!} />
				) : (
					<ul class="flex items-center gap-6">
						<NavLink href="/login" label="Login" />
						<NavLink href="/register" label="Register" />
					</ul>
				)}
			</nav>
			<div class="h-16 w-full" />
			{children}
		</main>
	);
};

export default Layout;
