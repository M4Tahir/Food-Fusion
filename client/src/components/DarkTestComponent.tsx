import { useTheme } from '../context';

const DarkTestComponent = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="bg-background text-foreground w-[500px] space-y-4 rounded-2xl p-12 shadow-lg">
				<p className="text-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eligendi ullam
					totam beatae facilis eaque. Quos explicabo maiores quis illo deserunt a facilis,
					exercitationem nulla deleniti itaque, rem, repellendus placeat.
				</p>

				<button
					onClick={() => setTheme('dark')}
					className="bg-primary text-text-on-primary rounded-full px-6 py-3 transition hover:opacity-80"
				>
					Switch Theme
				</button>

				<select
					value={theme || ''}
					onChange={(e) => setTheme(e.target.value)}
					className="bg-primary focus:ring-accent hover:bg-opacity-90 active:bg-opacity-80 rounded-full border border-gray-300 px-6 py-3 text-white focus:ring-2 focus:outline-none disabled:opacity-50"
				>
					<option value="" disabled>
						Choose an option
					</option>
					<option className="text-black" value="system">
						System Preference
					</option>
					<option className="text-black" value="light">
						Light
					</option>
					<option className="text-black" value="dark">
						Dark
					</option>
				</select>
			</div>
		</div>
	);
};

export default DarkTestComponent;
