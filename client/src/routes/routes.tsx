import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.tsx';
import { Home, PageNotFound } from '../pages';
import { Login, Signup } from '../features/auth/index.ts';

const routes = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <PageNotFound />,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: 'recipes',
				element: <p>Some recipes.</p>,
			},
		],
	},
	{
		path: 'auth',
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'signup',
				element: <Signup />,
			},
		],
	},
]);

export default routes;
