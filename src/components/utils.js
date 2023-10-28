function hasEmptyProperty(object) {
  for (const property in object) {
    if (object[property] === '') return true;
  }
  return false;
}

export { hasEmptyProperty };
