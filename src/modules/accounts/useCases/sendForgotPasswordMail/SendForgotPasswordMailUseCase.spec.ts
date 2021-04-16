import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import AppError from '@shared/errors/AppError';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot password mail to an user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');
    const generateMailToken = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Teste',
      email: 'user@test.com',
      password: '123456',
      driver_license: 'ABC123',
    });

    await sendForgotPasswordMailUseCase.execute('user@test.com');

    expect(generateMailToken).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot password mail if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('inexistent@user.com')
    ).rejects.toEqual(new AppError('User does not exist'));
  });
});
