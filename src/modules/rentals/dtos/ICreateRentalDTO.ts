interface ICreateRentalDTO {
  id?: string;
  car_id: string;
  end_date?: Date;
  expected_return_date: Date;
  user_id: string;
  total?: number;
}

export default ICreateRentalDTO;
