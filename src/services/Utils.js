/**
 * Date corrected for timezone differences
 */
export function getCorrectedCurrentDate() {
  let date = new Date();
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return date;
}
