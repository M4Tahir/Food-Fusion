import { LinkButton } from '../Button';
import { ThemeToggle } from './index.ts';

const NavActions = () => {
	return (
		<ul className="flex items-center gap-4">
			<ThemeToggle />
			<li>
				<LinkButton type="secondary" to="/auth/login">
					Sign In
				</LinkButton>
			</li>
			<li>
				<LinkButton type="primary" to="/auth/signup">
					Signup
				</LinkButton>
			</li>
		</ul>
	);
};

export default NavActions;
