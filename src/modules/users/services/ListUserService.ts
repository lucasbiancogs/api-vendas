import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export { ListUserService };
