const { toWords } = require('number-to-words');

const titleExceptions = ['A', 'a', 'An', 'an', 'The', 'the'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Remove any leading formatting so that comparison for alphanumeric order
// takes the first alphanumeric character
function standardizeFormat(citation) {
  if (citation[0] === '"') {
    return standardizeFormat(citation.substring(1, citation.length));
  } if (citation.length > 2 && citation.substring(0, 3) === '<i>') {
    return standardizeFormat(citation.substring(3, citation.length));
  } if (titleExceptions.includes(citation.split(' ')[0])) {
    return standardizeFormat(citation.substring(citation.split(' ')[0].length), citation.length);
  }
  return citation;
}

// For number comparison since localeCompare does string comparison and only
// considers the first digit
function getStartNumber(citation) {
  if (digits.includes(citation[0])) {
    let i = 0;
    let curr = 0;
    while (digits.includes(citation[i])) {
      curr *= 10;
      curr += parseInt(citation[i]);
      ++i;
    }
    return toWords(curr);
  }
  return citation;
}

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1
 * @param {Object} citation2
 */
export function APASort(citation1, citation2) {
  const apa1 = getStartNumber(standardizeFormat(citation1.apa));
  const apa2 = getStartNumber(standardizeFormat(citation2.apa));
  return apa1.localeCompare(apa2);
}

export function MLASort(citation1, citation2) {
  const mla1 = getStartNumber(standardizeFormat(citation1.mla));
  const mla2 = getStartNumber(standardizeFormat(citation2.mla));
  return mla1.localeCompare(mla2);
}

export function ChicagoSort(citation1, citation2) {
  const chicago1 = getStartNumber(standardizeFormat(citation1.chicago));
  const chicago2 = getStartNumber(standardizeFormat(citation2.chicago));
  return chicago1.localeCompare(chicago2);
}

export function HarvardSort(citation1, citation2) {
  const harvard1 = getStartNumber(standardizeFormat(citation1.harvard));
  const harvard2 = getStartNumber(standardizeFormat(citation2.harvard));
  return harvard1.localeCompare(harvard2);
}
