import { ReactNode } from 'react';

const Label = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
	return <label htmlFor={htmlFor} className="text-inherit font-medium ">{children}</label>;
};

export default Label;
