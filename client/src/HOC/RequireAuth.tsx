import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../hook';

export const RequireAuth = ({ children }: PropsWithChildren) => {
	const { state } = useAuthContext();
	const location = useLocation();

	if (state.user == null) {
		return <Navigate to={'/sign-in'} state={location} />;
	}

	return children;
};
