import { Button, Label, TextInput } from '..';

const FormSignup = () => {
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
			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="password-confirm">Confirm password</Label>
				<TextInput id="password-confirm" />
			</div>
			<Button>Signup</Button>
		</form>
	);
};

export default FormSignup;
