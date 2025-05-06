import { JSX, ReactNode } from 'react';

type Provider = {
	name: string;
	icon: JSX.Element;
	onClick?: () => void;
};

type SocialLoginProps = {
	providers: Provider[];
	children: ReactNode;
};

const SocialLogin = ({ providers = [], children }: SocialLoginProps) => {
	return (
		<div>
			{/* <div className="divider">
				<span>or</span>
			</div> */}
			{providers.length ? (
				<div className="flex items-center gap-4">
					<hr className="border-accent2 flex-1 border-t" />
					<span className="text-sm whitespace-nowrap">or</span>
					<hr className="border-accent2 flex-1 border-t" />
				</div>
			) : null}
			<div className="mt-6 flex flex-col gap-4">
				{providers.map((itm) => (
					<button
						key={itm.name}
						className="border-foreground/50 hover:border-foreground flex rounded-full border px-4 py-2"
						onClick={itm.onClick}
					>
						{itm.icon}
						<div className="grow text-center">
							<span>{itm.name}</span>
						</div>
					</button>
				))}
				{children}
			</div>
		</div>
	);
};

export default SocialLogin;
