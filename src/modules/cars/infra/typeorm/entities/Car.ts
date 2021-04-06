import { v4 as uuidv4 } from 'uuid';

class Car {
  id: string;

  name: string;

  description: string;

  daily_rate: number;

  available: boolean;

  license_plate: string;

  fine_amount: number;

  brand: string;

  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.createdAt = new Date();
    }
  }
}

export default Car;
