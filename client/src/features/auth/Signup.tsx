import { Link } from 'react-router';
import { FormSignup, SocialLogin, socialLinkProvider } from '.';
import { Logo } from '../../components';

const Signup = () => {
	return (
		<section className="flex h-dvh justify-center pt-6">
			<div className="flex max-w-[400px] shrink grow flex-col p-2">
				<header className="mb-6 flex flex-col items-center justify-center space-y-2">
					<Logo width="64" height="64" />
					<h1 className="text-3xl">Signup to start baking</h1>
				</header>
				<FormSignup />
				<div>
					<SocialLogin providers={socialLinkProvider}>
						<hr className="text-muted mt-6" />
						<p className="text-foreground/50">
							Already have an account?
							<Link className="text-foreground ml-1" to={'/auth/login'}>
								Login here
							</Link>
						</p>
					</SocialLogin>
				</div>
			</div>
		</section>
	);
};

export default Signup;
