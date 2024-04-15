import { createContext, PropsWithChildren, useReducer } from 'react';

import { authReducer, initialState } from '../reducer/authReducer/reducer';
import { Action, ActionType, UserState } from '../reducer/authReducer/types';

type TAuthContext = {
	state: UserState;
	dispatch: React.Dispatch<Action<ActionType>>;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
