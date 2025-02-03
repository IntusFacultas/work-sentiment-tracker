import { getDaysInMonth } from 'date-fns';

const getDatesForMonth = (monthIndex: number, numberOfDays: number) => {
  const dates = Array.from(Array(numberOfDays)).map((_, index) => {
    return new Date(
      new Date().getFullYear(),
      monthIndex,
      index + 1,
      0,
      0,
      0,
      0,
    );
  });
  return dates;
};
const DATES_IN_WEEK = 7;
export const getDatesInYear = (year: number) => {
  const startDatesOfEachMonth = [
    // January
    new Date(year, 0, 1, 0, 0, 0, 0),
    // February
    new Date(year, 1, 1, 0, 0, 0, 0),
    // March
    new Date(year, 2, 1, 0, 0, 0, 0),
    // April
    new Date(year, 3, 1, 0, 0, 0, 0),
    // May
    new Date(year, 4, 1, 0, 0, 0, 0),
    // June
    new Date(year, 5, 1, 0, 0, 0, 0),
    // July
    new Date(year, 6, 1, 0, 0, 0, 0),
    // August
    new Date(year, 7, 1, 0, 0, 0, 0),
    // September
    new Date(year, 8, 1, 0, 0, 0, 0),
    // October
    new Date(year, 9, 1, 0, 0, 0, 0),
    // November
    new Date(year, 10, 1, 0, 0, 0, 0),
    // December
    new Date(year, 11, 1, 0, 0, 0, 0),
  ];
  return startDatesOfEachMonth
    .flatMap(date => {
      const datesInMonth = getDaysInMonth(date);
      return getDatesForMonth(date.getMonth(), datesInMonth);
      // Paginate by week
    })
    .reduce<Date[][]>(
      (acc, date) => {
        const currentWeek = Math.max(acc.length - 1, 0);
        const datesInCurrentWeek = acc[currentWeek]?.length;
        if (datesInCurrentWeek === DATES_IN_WEEK) {
          acc.push([date]);
        } else {
          acc[currentWeek].push(date);
        }
        return acc;
      },
      [[]],
    );
};
