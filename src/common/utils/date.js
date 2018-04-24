function addZero(str) {
  return str > 9 ? str : '0' + str;
}

/**
 * parse HH:mm:ss to HHmm
 * @param date 格式为 HH:mm:ss 或 HH-mm-ss
 * @returns {*}
 */
export function parseHHmm(date) {
  return date.slice(0, 2) + date.slice(3, 5);
}

/**
 *
 * @param {Date}
 * @return {yyyy-MM-dd}
 */
export function parseDate(date) {
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
};

/**
 *
 * @param {Date}
 * @return {HH:mm:ss}
 */
export function parseTime(date) {
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
};
