import { Link } from 'react-router';
import { FormLogin, socialLinkProvider, SocialLogin } from '.';
import { Logo } from '../../components';

const Login = () => {
	return (
		<section className="text-text-on-primary flex h-dvh items-start justify-center pt-6">
			<div className="login-bg flex min-h-[730px] min-w-[730px] items-center justify-center">
				<div className="flex max-w-[400px] shrink grow flex-col">
					<header className="mb-6 flex flex-col items-center justify-center">
						<Logo width="64" height="64" />
						<h1 className="text-3xl">Log in to start baking</h1>
					</header>
					<FormLogin />
					<div>
						<SocialLogin providers={socialLinkProvider}>
							<hr className="text-muted mt-6" />
							<p className={`text-text-on-primary/30`}>
								Don't have an account?
								<Link className="text-text-on-primary/80 ml-1" to={'/auth/signup'}>
									Sign up for free
								</Link>
							</p>
						</SocialLogin>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
