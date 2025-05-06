import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface LinkButtonProps {
	children: ReactNode;
	to: string;
	replace?: boolean;
	type: 'primary' | 'secondary';
}

const LinkButton = ({ children, to, type, replace = false }: LinkButtonProps) => {
	const baseStyles =
		'cursor-pointer rounded-md px-6 py-3 transition-all duration-300 border text-sm font-medium';

	const variantStyles =
		type === 'primary'
			? 'bg-primary text-white border-primary hover:bg-opacity-80'
			: 'border-primary text-primary';

	return (
		<Link
			to={to}
			replace={replace}
			className={clsx(
				baseStyles,
				variantStyles,
				'hover:shadow-primary duration-300 ease-out hover:shadow-[0_1px_5px_currentColor]',
			)}
		>
			{children}
		</Link>
	);
};

export default LinkButton;
