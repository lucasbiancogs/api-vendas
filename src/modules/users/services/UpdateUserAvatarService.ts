import { getCustomRepository } from 'typeorm';
import path from 'path';
import AppError from '../../../shared/errors/appError';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '../../../config/upload';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      // Aqui nós pegamos o caminho do arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // fs vai verificar se o arquivo existe e se é um arquivo
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // Deleta o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
