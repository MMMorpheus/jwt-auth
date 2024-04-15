import { Router } from "express";

import { authRouter } from "./authRouter.js";
import { protectedRouter } from "./protectedRouter.js";

const rootRouter: Router = Router();

rootRouter.use("/api", protectedRouter);
rootRouter.use("/api", authRouter);

export { rootRouter };
