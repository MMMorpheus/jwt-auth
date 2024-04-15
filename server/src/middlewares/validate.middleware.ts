import z, { ZodTypeAny } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { RequestHandler } from 'express';

import { BadRequest } from '../exceptions/apiError.js';

type ParseSchema = <T extends ZodTypeAny>(
	schema: T,
	data: unknown
) => z.infer<T>;

const parse: ParseSchema = (schema, data) => {
	const validationResult = schema.safeParse(data);

	if (!validationResult.success) {
		throw new BadRequest(fromZodError(validationResult.error).toString());
	}

	return validationResult.data;
};

export type ParsedObj = ReturnType<ParseSchema>;

export const validateRequest =
	<T extends ZodTypeAny>(schema: T): RequestHandler =>
	async (req, res, next) => {
		try {
			const validated = parse(schema, req.body);

			req.payload = validated;
			next();
		} catch (error: unknown) {
			next(error);
		}
	};
