const TextInput = ({
	id,
	placeholder,
	className,
}: {
	id: string;
	placeholder?: string;
	className?: string;
}) => {
	return (
		<input
			type="text"
			id={id}
			placeholder={placeholder}
			className={`text-foreground border-foreground/10 rounded-md border px-6 py-3 ${className}`}
		/>
	);
};

export default TextInput;
