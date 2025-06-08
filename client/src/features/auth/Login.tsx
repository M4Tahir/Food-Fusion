import { Link } from 'react-router';
import { FormLogin, socialLinkProvider, SocialLogin } from '.';
import { Button, Label, Logo, TextInput } from '../../components';
import { useLogin } from './useLogin';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginType {
	email: string;
	password: string;
}

const Login = () => {
	const { isPending, error, login } = useLogin();

	const { register, handleSubmit, formState, watch } = useForm<LoginType>();

	// here onSubmit function is type of SubmitHandler<LoginType> function that accept that params.
	const onSubmit: SubmitHandler<LoginType> = (data) => {
		login(data);
		console.log(data);
	};
	const handleClick = handleSubmit(onSubmit)

	return (
		<section className="text-text-on-primary flex h-dvh items-start justify-center pt-6">
			<div className="login-bg flex min-h-[730px] min-w-[730px] items-center justify-center">
				<div className="flex max-w-[400px] shrink grow flex-col">
					<header className="mb-6 flex flex-col items-center justify-center">
						<Logo width="64" height="64" />
						<h1 className="text-3xl">Log in to start baking</h1>
					</header>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mb-6 flex flex-col space-y-4 text-inherit"
					>
						<div className="flex shrink grow flex-col gap-1">
							<Label htmlFor="email">Email address</Label>
							<TextInput
								id="email"
								placeholder="Enter your email"
								className="text-text-on-primary border-text-on-primary/15 border-[1px]"
								{...register('email', {
									required: true,
									// validate: (value) => {
									// 	  return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address";
									// },
									pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								})}
							/>
						</div>

						<div className="flex shrink grow flex-col gap-1">
							<Label htmlFor="password">Password</Label>
							<TextInput
								id="password"
								placeholder="Enter your password"
								className="text-text-on-primary border-text-on-primary/15 border-[1px]"
								{...register('password', { required: true, minLength: 8 })}
							/>
						</div>
						<Button onClick={handleClick} type="submit">Login</Button>
						
					</form>
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
