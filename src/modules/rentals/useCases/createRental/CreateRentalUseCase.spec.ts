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
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC123',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'Category',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: tomorrow,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if user already has one', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '123456',
      expected_return_date: tomorrow,
      user_id: '123456',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '654321',
        expected_return_date: tomorrow,
        user_id: '123456',
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user')
    );
  });

  it('Should not be able to create a new rental when devolution date < 24 hours from the moment of rent', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '123456',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toEqual(new AppError('Invalid devolution car datetime'));
  });
});
