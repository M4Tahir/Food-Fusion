import { ReactNode } from 'react';

const Button = ({
	children,
	onClick,
	type,
	args,
}: {
	children: ReactNode;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'cancel' | undefined;
	args?: [];
}) => {
	return (
		<button
			onClick={onClick}
			className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 hover:cursor-pointer"
			type={type}
			{...args}
		>
			{children}
		</button>
	);
};

export default Button;
