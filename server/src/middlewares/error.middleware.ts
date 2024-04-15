import { ErrorRequestHandler } from "express";
import { ApiError, ServerError } from "../exceptions/apiError.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        res.status(error.statusCode).send({
            message: error.message,
            errors: error.errors,
        });
    } else {
        const serverError = new ServerError(error.stack);

        console.log(serverError);

        res.status(serverError.statusCode).send(serverError.message);
    }
};
