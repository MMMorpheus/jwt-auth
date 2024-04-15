export class ApiError extends Error {
    statusCode: number;
    errors: string[];

    constructor(statusCode: number, message: string, errors: string[] = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export class Conflict extends ApiError {
    constructor(message: string, errors: string[] = []) {
        super(409, message, errors);
    }
}

export class BadRequest extends ApiError {
    constructor(message: string, errors: string[] = []) {
        super(400, message, errors);
    }
}

export class Unauthorized extends ApiError {
    constructor(message: string, errors: string[] = []) {
        super(401, message, errors);
    }
}

export class Forbidden extends ApiError {
    constructor(message: string, errors: string[] = []) {
        super(403, message, errors);
    }
}

export class ServerError extends ApiError {
    stack: any;

    constructor(stack: any, errors: string[] = []) {
        super(500, "Something went wrong", errors);
        this.stack = stack;
    }
}
