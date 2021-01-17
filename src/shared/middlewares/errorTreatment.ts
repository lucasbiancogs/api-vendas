import AppError from '@shared/errors/appError';
import { Request, Response } from 'express';

function errorTreatment(
    error: Error,
    request: Request,
    response: Response,
): Response {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}

export default errorTreatment;
