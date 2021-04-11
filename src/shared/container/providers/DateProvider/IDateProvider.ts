interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(startDate: Date, endDate: Date): number;
  dateNow(): Date;
}

export default IDateProvider;
