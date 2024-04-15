import { useAuthActions, useAuthContext, useUsers } from './hook';

const App = () => {
	const { state } = useAuthContext();
	const { logout } = useAuthActions();
	const { users, getUsers } = useUsers();

	return (
		<>
			<p>Main page</p>
			<p>{`User: ${state.user?.firstName} ${state.user?.lastName}`}</p>
			<p>{`Email: ${state.user?.email}`}</p>
			<button
				onClick={() => {
					logout();
				}}
			>
				Logout
			</button>
			<button
				onClick={() => {
					getUsers();
				}}
			>
				Get protected users
			</button>
			<ul>
				{users.map((el) => (
					<li
						key={el.email}
					>{`${el.firstName} ${el.lastName} - ${el.email}`}</li>
				))}
			</ul>
		</>
	);
};

export default App;
