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

export function fillArrayWithZero(arr, length) {
  let newArray = [];
  for (let index = 0; index < length - arr.length; index++) {
    newArray.push(0);
  }
  return [...arr, ...newArray];
}

export function formatToEUR(number) {
  let str = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  })
    .format(number)
    .replace(/\u00A0/g, "");
  return str;
}

export function StringToArray(string, splitstring) {
  return string.split(splitstring).filter(str => str !== "")
} 
