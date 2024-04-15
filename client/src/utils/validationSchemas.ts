import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			required_error: 'email field is required',
			invalid_type_error: 'first name must be a string',
		})
		.email('Invalid email address'),
	password: z.string().min(3, 'Password must contain at least 3 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		firstName: z
			.string({
				required_error: 'first name is required',
				invalid_type_error: 'first name must be a string',
			})
			.toLowerCase()
			.trim(),
		lastName: z
			.string({
				required_error: 'last name is required',
				invalid_type_error: 'last name must be a string',
			})
			.toLowerCase()
			.trim(),
		password: z.string().min(3, { message: 'Password is too short' }),
		passwordConfirmation: z.string(),
		email: z.string().email({ message: 'Invalid email address' }),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'],
	});

export type RegisterInput = z.infer<typeof registerSchema>;
