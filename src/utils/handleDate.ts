export function formatDateToday() {
  const dateToday = new Date();

  const year = dateToday.getFullYear();
  const month = String(dateToday.getMonth() + 1);
  const day = String(dateToday.getDate());

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
