import sanitizeString from './sanitizeString';

/**
 * Sorts an array of objects which contain a word property
 *
 * @param wordA {Object} - Object that contains a `word` property
 * @param wordB {Object} - Object that contains a `word` property
 * @return {Integer} - A number to dertermine if a word should be sorted up or down in the array
 */

export default (wordA, wordB) => {
  if (
    sanitizeString(wordA.word.toLowerCase()) <
    sanitizeString(wordB.word.toLowerCase())
  )
    return -1;
  if (
    sanitizeString(wordA.word.toLowerCase()) >
    sanitizeString(wordB.word.toLowerCase())
  )
    return 1;
  return 0;
};
