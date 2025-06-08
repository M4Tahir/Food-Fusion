import { ReactNode } from 'react';
import { Label, TextInput } from '../../components';

const FormLogin = ({ children }: { children: ReactNode }) => {

	return (
		<form className="mb-6 flex flex-col space-y-4 text-inherit">
			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="email">Email address</Label>
				<TextInput
					id="email"
					placeholder="Enter your email"
					className="text-text-on-primary border-text-on-primary/15 border-[1px]"
				/>
			</div>

			<div className="flex shrink grow flex-col gap-1">
				<Label htmlFor="password">Password</Label>
				<TextInput
					id="password"
					placeholder="Enter your password"
					className="text-text-on-primary border-text-on-primary/15 border-[1px]"
				/>
			</div>
			{children}
		</form>
	);
};

export default FormLogin;
