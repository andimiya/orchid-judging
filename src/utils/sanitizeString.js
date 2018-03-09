export default str => {
  let parsedStr = str;

  const removalMap = [
    { base: 'a', letters: /[\u0100\u0101]/g }, // Ā and ā
    { base: 'e', letters: /[\u0112\u0113]/g }, // Ē and ē
    { base: 'i', letters: /[\u012b\u012b]/g }, // Ī and ī
    { base: 'o', letters: /[\u014c\u014d]/g }, // Ō and ō
    { base: 'u', letters: /[\u016a\u016b]/g }, // Ū and ū
  ];

  for (var i = 0; i < removalMap.length; i++) {
    parsedStr = parsedStr.replace(removalMap[i].letters, removalMap[i].base);
  }
  /*
  After replacing all vowels with kahakos, we return a string with only regular
  letters effectively stripping out all other special characters including okinas
  or other special characters that a user may try to use for an okina such as
  an apostrophe or other special characters that may be inputted
  */
  return parsedStr.replace(/[^\w\s]/gi, '').toLowerCase();
};
