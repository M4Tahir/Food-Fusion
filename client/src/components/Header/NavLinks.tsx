import React from 'react';
import { NavItem } from './index.ts';

const navItems = [
	{ to: '/recipes', label: 'Recipes' },
	{ to: '/popular', label: 'Popular' },
	{ to: '/cuisine', label: 'Cuisine' },
];

const NavLinks = ({ styles }: { styles: string }) => {
	return (
		<ul className={styles}>
			{navItems.map((item) => (
				<NavItem key={item.to} {...item} />
			))}
		</ul>
	);
};

export default NavLinks;
