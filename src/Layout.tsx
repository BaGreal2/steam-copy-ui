import { For, JSX } from 'solid-js';

import NavLink from '@/components/ui/nav-link';

import { user } from './store/auth';

interface NavLinkType {
	label: string;
	href: string;
}

const NAV_LINKS: NavLinkType[] = [
	{
		label: 'Home',
		href: '/'
	},
	{
		label: 'Library',
		href: '/library'
	},
	{
		label: 'Developer',
		href: '/developer'
	}
];

interface Props {
	children?: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<main class="flex min-h-screen w-full flex-col">
			<nav class="flex h-16 w-full items-center justify-between bg-blue-950 px-10 shadow-lg">
				<ul class="flex items-center gap-6">
					<For each={NAV_LINKS}>{(navLink) => <NavLink {...navLink} />}</For>
				</ul>
				{user() ? (
					<button class="size-10 cursor-pointer rounded-full bg-red-500" />
				) : (
					<ul class="flex items-center gap-6">
						<NavLink href="/login" label="Login" />
						<NavLink href="/register" label="Register" />
					</ul>
				)}
			</nav>
			{children}
		</main>
	);
};

export default Layout;
