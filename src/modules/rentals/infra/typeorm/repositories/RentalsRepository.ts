import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    end_date,
    expected_return_date,
    user_id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      end_date,
      expected_return_date,
      user_id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openRentalByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return openRentalByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return openRentalByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }
}

export default RentalsRepository;
