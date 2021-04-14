import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    const now = dayjs().toDate();

    return now;
  }

  convertToUTC(date: Date): string {
    const utcDate = dayjs(date).utc().local().format();

    return utcDate;
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    const compare = dayjs(endDateUTC).diff(startDateUTC, 'hours');

    return compare;
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    const compare = dayjs(endDateUTC).diff(startDateUTC, 'days');

    return compare;
  }

  addDays(days: number): Date {
    const finalDate = dayjs().add(days, 'days').toDate();

    return finalDate;
  }
}

export default DayjsDateProvider;
