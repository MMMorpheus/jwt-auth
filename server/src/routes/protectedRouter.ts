import { Router } from 'express';

import { authenticateRequest } from '../middlewares/auth.middleware.js';
import { db } from '../db/index.js';

const protectedRouter: Router = Router();

// protectedRouter.use();

protectedRouter.get('/users', authenticateRequest, async (req, res, next) => {
	try {
		const users = await db.user.findMany({
			select: {
				firstName: true,
				lastName: true,
				email: true,
			},
		});

		res.status(200).send({ data: users });
	} catch (error: unknown) {
		const err = error as Error;

		next(err);
	}
});

export { protectedRouter };
