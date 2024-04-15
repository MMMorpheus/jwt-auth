import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { SignIn, SignUp } from '../pages';
import { RequireAuth } from '../HOC';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<App />
			</RequireAuth>
		),
	},
	{
		path: '/sign-in',
		element: <SignIn />,
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},
]);
