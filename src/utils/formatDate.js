import DateFns from "date-fns";

/**
 * Formats a date string as 'July 31, 2017' with a 10 hour offset for HST
 *
 * @param date {String} - An ISO 8601-formatted date string
 * @param dateFormat {String} - takes in a format such as 'MM DD, YYYY'
 * @return {String} - The formatted date string as 'Month Date, Year'
 */

export default (date, dateFormat) => {
  return DateFns.format(date, dateFormat);
};
