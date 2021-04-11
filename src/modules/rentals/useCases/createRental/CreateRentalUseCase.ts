import { inject, injectable } from 'tsyringe';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  expected_return_date: Date;
  user_id: string;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minHoursRent = 24;

    const carAlreadyInUse = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carAlreadyInUse) {
      throw new AppError('Car is already in use');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userHasOpenRental) {
      throw new AppError('There is a rental in progress for this user');
    }

    const now = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(now, expected_return_date);

    if (compare < minHoursRent) {
      throw new AppError('Invalid devolution car datetime');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}

export default CreateRentalUseCase;
