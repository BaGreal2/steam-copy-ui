import { A } from '@solidjs/router';

interface Props {
	label: string;
	href: string;
}

const NavLink = ({ label, href }: Props) => {
	return (
		<A href={href} class="no-underline text-white text-lg hover:underline">
			{label}
		</A>
	);
};

export default NavLink;
