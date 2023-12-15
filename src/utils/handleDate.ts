/**
 * The `formatDateToday` function will return the date of the day it was called. The date will correspond to the beginning of the day.
 * @returns 
 */
export function formatDateToday() {
  const dateToday = new Date();

  const year = dateToday.getFullYear();
  const month = dateToday.getMonth() + 1;
  const day = dateToday.getDate();

  const beginningOfTheDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  return beginningOfTheDay;
}

/**
 * The `shiftDayOfADate` function receives two arguments: the first is a date, and the second is a number representing the amount of days to shift the date. The second parameter can be either positive or negative. If it is positive, the result will be a date greater than the one passed, but if it is negative, the date will be earlier.
 * @param {Date|string} date
 * @param {number} offsetDays
 * @returns
 */
export function shiftDayOfADate(date: Date | string, offsetDays: number) {
  const rawDateInMilliseconds = new Date(date).getTime();

  const modifiedDate = new Date(
    rawDateInMilliseconds + 24 * 60 * 60 * 1000 * offsetDays
  );

  return modifiedDate;
}
