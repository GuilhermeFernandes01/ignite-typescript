import { getRepository, Repository } from 'typeorm';

import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
