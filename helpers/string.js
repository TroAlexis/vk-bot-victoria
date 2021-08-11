function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || !string.length) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  capitalizeFirstLetter,
};
