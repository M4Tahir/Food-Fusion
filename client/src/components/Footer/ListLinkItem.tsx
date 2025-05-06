import { ReactNode } from 'react';
import { Link } from 'react-router';

const ListLinkItem = ({ to, children }: { to: string; children: ReactNode }) => {
	return (
		<li>
			<Link to={to}>{children}</Link>
		</li>
	);
};

export default ListLinkItem;
