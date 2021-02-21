import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/appError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  name: String;
  token: String;
  duration: number;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const { name, id } = user;

    const secret = authConfig.jwt.secret;
    const expiresIn = authConfig.jwt.expiresIn;

    const duration = parseInt(expiresIn.split('h')[0]) * 3600;

    const jwtBody = { name, id, duration };

    const options = {
      subject: user.id,
      expiresIn,
    };

    const token = sign(jwtBody, secret, options);

    return {
      name,
      token,
      duration,
    };
  }
}

export default CreateSessionService;
