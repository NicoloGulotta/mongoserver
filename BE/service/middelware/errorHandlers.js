const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

export const handleError = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export const badRequestHandler = (err, req, res, next) => {
    if (err.status === BAD_REQUEST) {
        res.status(BAD_REQUEST).json({
            success: false,
            message: 'Invalid request parameters',
            errors: err.errorList?.map((error) => error.msg),
        });
    } else {
        next(err);
    }
};

export const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === UNAUTHORIZED) {
        res.status(UNAUTHORIZED).json({
            success: false,
            message: 'Authorization failed',

        });
    } else {
        next(err);
    }
};

export const notFoundHandler = (err, req, res, next) => {
    if (err.status === NOT_FOUND) {
        res.status(NOT_FOUND).json({
            success: false,
            message: 'The requested resource was not found',
        });
    } else {
        next(err);
    }
};


