import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User or email incorret', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('User or email incorret', 401);
    }

    const {
      expiresInToken,
      secretToken,
      secretRefreshToken,
      expiresInRefreshToken,
      daysToExpireRefreshToken,
    } = auth;

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      daysToExpireRefreshToken
    );

    await this.usersTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      refresh_token: refreshToken,
      user_id: user.id,
    });

    const authResponse: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };

    return authResponse;
  }
}

export default AuthenticateUserUseCase;
