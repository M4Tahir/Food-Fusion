import { Button, Label, TextInput } from '../../components';

const FormSignup = () => {
	return (
		<form className="mb-6 flex flex-col space-y-4">
			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="email">Email address</Label>
				<TextInput id="email" placeholder="email@example.com" />
			</div>

			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="password">Password</Label>
				<TextInput id="password" placeholder="your password" />
			</div>
			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="password-confirm">Confirm password</Label>
				<TextInput id="password-confirm" placeholder="confirm you password" />
			</div>
			<Button>Signup</Button>
		</form>
	);
};

export default FormSignup;
