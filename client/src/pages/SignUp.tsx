import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { useAuthFrom } from '../hook';
import { registerSchema } from '../utils/validationSchemas';

export const SignUp: FC = () => {
	const { register, handleSubmit, onSubmit, errors } = useAuthFrom(
		registerSchema,
		'register'
	);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label={'First name'}
					placeholder="First name"
					error={errors?.firstName}
					{...register('firstName')}
				/>
				<Input
					label={'Last name'}
					placeholder="Last name"
					error={errors?.lastName}
					{...register('lastName')}
				/>
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
				<Input
					label={'Confirm password'}
					type="password"
					placeholder="Confirm password"
					error={errors?.passwordConfirmation}
					{...register('passwordConfirmation')}
				/>
				<button>Submit</button>
			</form>
			<Link to={'/sign-in'}>Already have an account? Login</Link>
		</div>
	);
};
