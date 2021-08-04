import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/userToken';

@EntityRepository(UserToken)
export class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(userId: string): Promise<UserToken | undefined> {
    const userToken = await this.create({
      userId
    });

    await this.save(userToken);

    return userToken;
  }
}
