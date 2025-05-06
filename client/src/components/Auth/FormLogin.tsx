import { Button, Label, TextInput } from '..';

const FormLogin = () => {
	return (
		<form className="mb-6 flex flex-col space-y-4">
			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="email">Email address</Label>
				<TextInput id="email" />
			</div>

			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="password">Password</Label>
				<TextInput id="password" />
			</div>

			<Button>Login</Button>
		</form>
	);
};

export default FormLogin;
