import {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { ZodTypeAny, z } from 'zod';

type Scenario = 'login' | 'register';

export type UseAuth = <T extends ZodTypeAny>(
	schema: T,
	scenario: Scenario
) => {
	register: UseFormRegister<z.TypeOf<T>>;
	handleSubmit: UseFormHandleSubmit<z.TypeOf<T>, undefined>;
	onSubmit: SubmitHandler<z.TypeOf<T>>;
	errors: FieldErrors<z.TypeOf<T>>;
};
