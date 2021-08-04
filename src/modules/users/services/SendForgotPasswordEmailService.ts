import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/appError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exist.');
    }

    const token = await usersTokensRepository.generate(user.id);

    console.log(`token: ${token}`);
  }
}

export { SendForgotPasswordEmailService };
