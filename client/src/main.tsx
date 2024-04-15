import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './main.css';

import { router } from './router';
import { AuthProvider } from './HOC';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>
	</React.StrictMode>
);
