import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/appError';
import { User } from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email adress already used.')
    }

    const hashedPassword = await hash(password, 8);
    console.log(hashedPassword);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
