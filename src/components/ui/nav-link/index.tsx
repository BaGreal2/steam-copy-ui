import { A, useLocation, useMatch } from '@solidjs/router';

import { cn } from '@/lib/utils';

interface Props {
	label: string;
	href: string;
}

const NavLink = (props: Props) => {
	const matches = useMatch(() => props.href);

	return (
		<A
			href={props.href}
			class={cn(
				'text-lg text-white hover:underline',
				matches() ? 'underline' : 'no-underline'
			)}
		>
			{props.label}
		</A>
	);
};

export default NavLink;
