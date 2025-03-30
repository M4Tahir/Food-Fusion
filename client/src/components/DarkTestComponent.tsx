import { useTheme } from "../context/ThemeContext.tsx";

const DarkTestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-background text-foreground w-[500px] space-y-4 rounded-2xl p-12 shadow-lg space-x-1">
        <p className="text-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          eligendi ullam totam beatae facilis eaque. Quos explicabo maiores quis
          illo deserunt a facilis, exercitationem nulla deleniti itaque, rem,
          repellendus placeat.
        </p>
        <button onClick={() => setTheme("dark")}
                className="bg-primary text-foreground rounded-full px-6 py-3 transition hover:opacity-80">
          Switch Theme
        </button>
        <select
          className="bg-primary text-white px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-opacity-90 active:bg-opacity-80 disabled:opacity-50"
          onChange={(e) => setTheme(e.target.value)}
        >
          <option disabled selected value="">
            Choose an option
          </option>
          <option
            className="bg-white text-black hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-400 disabled:opacity-50"
            value="system">
            System Preference
          </option>
          <option
            className="bg-white text-black hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-400 disabled:opacity-50"
            value="light">
            Light
          </option>
          <option
            className="bg-white text-black hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-400 disabled:opacity-50"
            value="dark">
            Dark
          </option>
        </select>

      </div>
    </div>
  );
};

export default DarkTestComponent;
