import { ReactNode } from 'react';

const Button = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
	return (
		<button
			onClick={onClick}
			className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 hover:cursor-pointer"
		>
			{children}
		</button>
	);
};

export default Button;
