import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { useAuthFrom } from '../hook/useAuthForm/useAuthForm';
import { loginSchema } from '../utils/validationSchemas';

export const SignIn: FC = () => {
	const { register, handleSubmit, onSubmit, errors } = useAuthFrom(
		loginSchema,
		'login'
	);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label={'Email'}
					placeholder="Email"
					error={errors?.email}
					{...register('email')}
				/>
				<Input
					label={'Password'}
					type="password"
					placeholder="Password"
					error={errors?.password}
					{...register('password')}
				/>
				<button>Submit</button>
			</form>
			<Link to={'/sign-up'}>Don't have an account? Register</Link>
		</div>
	);
};
