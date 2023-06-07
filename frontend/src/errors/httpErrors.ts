class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {} // this happens for example when we try to sign up with an email that already exists