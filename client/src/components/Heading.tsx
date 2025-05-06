import { ReactNode } from 'react';
import clsx from 'clsx';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const headingStyle: Record<HeadingType, string> = {
	h1: 'text-foreground text-4xl',
	h2: 'text-foreground text-3xl',
	h3: 'text-foreground text-2xl',
	h4: 'text-foreground text-xl',
	h5: 'text-foreground text-lg',
	h6: 'text-foreground text-base',
};

interface HeadingProps {
	children: ReactNode;
	type: HeadingType;
	className?: string;
	uppercase?: boolean;
	bold?: boolean;
	italic?: boolean;
	align?: 'center' | 'left' | 'right';
}

const Heading = ({
	children,
	type,
	className = '',
	uppercase = false,
	bold = false,
	italic = false,
	align = 'left',
}: HeadingProps) => {
	const Tag = type;
	return (
		<Tag
			className={clsx(
				'text-foreground',
				headingStyle[type],
				{
					uppercase: uppercase,
					'font-bold': bold,
					italic: italic,
					'text-left': align === 'left',
					'text-right': align === 'right',
					'text-center': align === 'center',
				},
				className,
			)}
		>
			{children}
		</Tag>
	);
};

export default Heading;
