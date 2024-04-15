import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { UseAuth } from './types';
import { useAuthActions } from '../useAuthActions/useAuthActions';

export const useAuthFrom: UseAuth = (schema, scenario) => {
	const { login: loginFn, register: registerFn } = useAuthActions();

	type SchemaType = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SchemaType>({
		mode: 'onBlur',
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<SchemaType> = (data) => {
		switch (scenario) {
			case 'login':
				loginFn(data);
				break;
			case 'register':
				registerFn(data);
				break;
		}
	};

	return { register, handleSubmit, onSubmit, errors };
};
