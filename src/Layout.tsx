import { For, JSX } from 'solid-js';

import NavLink from '@/components/ui/nav-link';

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
		<main class="flex flex-col min-h-screen w-full">
			<nav class="flex px-10 w-full h-16 bg-blue-950 shadow-lg">
				<ul class="flex gap-4 items-center">
					<For each={NAV_LINKS}>
						{(navLink) => <NavLink {...navLink}>{navLink.label}</NavLink>}
					</For>
				</ul>
			</nav>
			{children}
		</main>
	);
};

export default Layout;
