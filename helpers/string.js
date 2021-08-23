function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || !string.length) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO Create positive answer matcher
// eslint-disable-next-line no-unused-vars
function isPositiveAnswer(string) {
  return true;
}

module.exports = {
  capitalizeFirstLetter,
  isPositiveAnswer,
};
