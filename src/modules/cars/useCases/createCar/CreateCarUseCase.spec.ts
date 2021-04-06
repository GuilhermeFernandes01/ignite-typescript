import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC123',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'Category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with an already existent license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car name 1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC123',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'Category',
      });

      await createCarUseCase.execute({
        name: 'Car name 2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC123',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a car with available true as default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name 1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC123',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });
});
