const TextInput = ({
	id,
	placeholder,
	className,
	args
}: {
	id: string;
	placeholder?: string;
	className?: string;
	args?: []
}) => {
	return (
		<input
			type="text"
			id={id}
			placeholder={placeholder}
			className={`text-foreground border-foreground/10 rounded-md border px-6 py-3 ${className}`}
			{...args}
		/>

	);
};

export default TextInput;
