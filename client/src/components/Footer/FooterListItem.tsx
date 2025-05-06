import React, { ReactNode } from 'react';

const FooterListItem = ({
	children,
	label,
	link,
}: {
	children: ReactNode;
	label: ReactNode;
	link: string;
}) => {
	return (
		<li>
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 hover:underline"
			>
				{children}
				<span>{label}</span>
			</a>
		</li>
	);
};

export default FooterListItem;
