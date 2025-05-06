import React from 'react';
import { NavActions, NavLinks } from './index.ts';

const NavBar = () => {
	return (
		<nav className="nav flex items-center justify-between gap-10">
			<NavLinks styles={'flex items-center justify-center gap-10'} />
			<NavActions />
		</nav>
	);
};

export default NavBar;
