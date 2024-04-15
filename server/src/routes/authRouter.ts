import { Router } from "express";

import { AuthController } from "../controllers/Auth.controller.js";
import { createHeadersFingerprint, validateRequest } from "../middlewares/index.js";
import { createUserSchema, loginUserSchema } from "../utils/validationSchemas.js";

const authRouter: Router = Router();

authRouter.use(createHeadersFingerprint);

authRouter.post("/register", validateRequest(createUserSchema), AuthController.register);
authRouter.post("/login", validateRequest(loginUserSchema), AuthController.login);
authRouter.get("/logout", AuthController.logout);
authRouter.get("/activate/:link");
authRouter.get("/refresh", AuthController.refresh);

export { authRouter };
