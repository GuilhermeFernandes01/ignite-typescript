interface IDateProvider {
  dateNow(): Date;
  convertToUTC(date: Date): string;
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIsBefore(startDate: Date, endDate: Date): boolean;
}

export default IDateProvider;
