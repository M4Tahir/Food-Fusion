import React from 'react';
import { useTheme } from '../../context';
import { ThemeToggleItem } from './index.ts';

const options = [
	{ label: 'Dark', value: 'dark' },
	{ label: 'Light', value: 'light' },
	{ label: 'System', value: 'system' },
];

const ThemeToggleMenu = () => {
	const { theme, setTheme } = useTheme();

	function handleClick(newTheme: string) {
		if (theme !== newTheme) setTheme(newTheme);
	}

	return (
		<ul className="bg-background flex flex-col space-y-3 rounded-lg p-4 shadow-md">
			{options.map((opt) => (
				<ThemeToggleItem key={opt.label} value={opt.value} onClick={handleClick}>
					{opt.label}
				</ThemeToggleItem>
			))}
		</ul>
	);
};

export default ThemeToggleMenu;
