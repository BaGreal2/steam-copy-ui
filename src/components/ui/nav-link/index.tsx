import { A, useMatch } from '@solidjs/router';

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
				'text-lg font-medium transition-all duration-200 hover:underline',
				matches() ? 'text-white underline' : 'text-white/70'
			)}
		>
			{props.label}
		</A>
	);
};

export default NavLink;
