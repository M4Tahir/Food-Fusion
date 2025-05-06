import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

const AppLayout = () => {
	return (
		<div className="grid h-dvh grid-rows-[auto_1fr_auto]">
			<Header />

			<main className="p-6">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default AppLayout;
