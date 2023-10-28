import { format } from 'date-fns';

function hasEmptyProperty(object) {
  for (const property in object) {
    if (object[property] === '') return true;
  }
  return false;
}

function formatDateToMonthYear(isoDate) {
  const date = new Date(isoDate);
  return format(date, 'MMMM-yyyy');
}

export { hasEmptyProperty, formatDateToMonthYear };
