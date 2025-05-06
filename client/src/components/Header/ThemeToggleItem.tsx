import React, { ReactNode } from 'react';

const ThemeToggleItem = ({
	children,
	value,
	onClick,
}: {
	children: ReactNode;
	value: string;
	// onClick: (e: MouseEvent<HTMLLIElement>) => void // because MouseEvent alone is the browser's native event type (Window.MouseEvent), and that one is not generic.
	// React wraps the browser events in its own system (called SyntheticEvent) to work correctly across browsers.
	onClick: (newTheme: string) => void;
}) => {
	return (
		<li
			className="bg-surface hover:bg-hover hover:border-border flex cursor-pointer items-center justify-start rounded-md border border-transparent px-8 py-2 transition-all duration-300 ease-out"
			value={value}
			onClick={() => onClick(value)}
		>
			{children}
		</li>
	);
};

export default ThemeToggleItem;
