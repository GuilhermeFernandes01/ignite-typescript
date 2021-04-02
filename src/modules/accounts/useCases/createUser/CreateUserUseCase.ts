import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UsersRepository from '../../implementations/UsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
