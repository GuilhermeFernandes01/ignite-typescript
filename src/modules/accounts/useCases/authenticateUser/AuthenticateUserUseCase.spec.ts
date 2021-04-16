import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Teste',
      email: 'user@test.com',
      password: '123456',
      driver_license: 'ABC123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate when user does not exist', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '123456',
      })
    ).rejects.toEqual(new AppError('User or email incorret', 401));
  });

  it('Should not be able to authenticate when user password is incorret', async () => {
    const user: ICreateUserDTO = {
      name: 'Teste',
      email: 'user@test.com',
      password: '123456',
      driver_license: 'ABC123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: 'incorrect',
      })
    ).rejects.toEqual(new AppError('User or email incorret', 401));
  });
});
