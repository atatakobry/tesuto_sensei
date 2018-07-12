function getLowerLatinPrefix(index) {
  const alphabet = String.fromCharCode(...Array(123).keys()).slice(97);

  return `${alphabet[index]}. `;
}

export default getLowerLatinPrefix;
