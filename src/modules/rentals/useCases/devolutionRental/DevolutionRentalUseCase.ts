import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    const minDaily = 1;

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    const now = this.dateProvider.dateNow();

    const car = await this.carsRepository.findById(rental.car_id);

    const diffInDays = this.dateProvider.compareInDays(rental.start_date, now);

    const dailys = diffInDays <= 0 ? minDaily : diffInDays;

    let total = dailys * car.daily_rate;

    const delay = this.dateProvider.compareInDays(
      now,
      rental.expected_return_date
    );

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total += calculate_fine;
    }

    rental.end_date = now;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export default DevolutionRentalUseCase;
