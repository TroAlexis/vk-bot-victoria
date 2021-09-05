function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || !string.length) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO Create positive answer matcher
// eslint-disable-next-line no-unused-vars
function isPositiveString(string) {
  return /^(д[ао](вай?)?|[аоу]г[ау]|х[ао]р[ао]шо)/i.test(string);
}

module.exports = {
  capitalizeFirstLetter,
  isPositiveString,
};
