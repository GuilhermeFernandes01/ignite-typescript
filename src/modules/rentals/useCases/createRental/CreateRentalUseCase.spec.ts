import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalUseCase from './CreateRentalUseCase';

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  const tomorrow = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '123456',
      expected_return_date: tomorrow,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if user already has one', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '123456',
        expected_return_date: tomorrow,
      });

      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '123456',
        expected_return_date: tomorrow,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental when devolution date < 24 hours from the moment of rent', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '123456',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
