/**
 * Sorts an array of objects which contain a deck name property
 *
 * @param deckA {Object} - Object that contains a `deckName` property
 * @param deckB {Object} - Object that contains a `deckName` property
 * @return {Integer} - A number to dertermine if a word should be sorted up or down in the array
 */

export default (deckA, deckB) => {
  if (deckA.deckName.toLowerCase() < deckB.deckName.toLowerCase()) return -1;
  if (deckA.deckName.toLowerCase() > deckB.deckName.toLowerCase()) return 1;
  return 0;
};
