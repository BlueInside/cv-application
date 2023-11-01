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

function formatLabel(property) {
  // Split property name at each capital letter and join with spaces
  let result = property.replace(/([A-Z])/g, ' $1').trim();
  result = capitalizeFirstLetter(result);
  return result;
}

function capitalizeFirstLetter(string) {
  // Make first letter Capital
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { hasEmptyProperty, formatDateToMonthYear, formatLabel };
