export function formatTwoDigits(number) {
  number = number.toString();
  if (number.length > 1) return number;
  return `0${number}`;
}

export function dateFormat(date) {
  date = new Date(date);
  return `${formatTwoDigits(date.getDate())}.${formatTwoDigits(
    date.getMonth() + 1
  )}.${date.getFullYear()} ${formatTwoDigits(
    date.getHours()
  )}:${formatTwoDigits(date.getMinutes())}:${formatTwoDigits(
    date.getSeconds()
  )}`;
}

export function StringToArray(string, splitstring) {
  return string.split(splitstring).filter(str => str !== "")
} 
