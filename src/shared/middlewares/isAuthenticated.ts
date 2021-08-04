import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '../../config/auth'
import { AppError } from "../errors/appError";

interface ITokenPayload {
  iat: number,
  exp: number,
  sub: string,
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token.')
  }
}
