export class BadRequestError extends Error {
    constructor(error) {
        super(error.message || error);
        this.data = { error };
        this.statusCode = 400;
    }
}

export class ConflictError extends Error {
    constructor(error) {
        super(error.message || error);
        this.data = { error };
        this.statusCode = 409;
    }
}

export class NotFoundError extends Error {
    constructor(error) {
        super(error.message || error);
        this.data = { error };
        this.statusCode = 404;
    }
}
