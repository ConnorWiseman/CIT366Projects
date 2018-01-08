(function(document, window, undefined) {



/**
 * Returns an array of elements shared between two elements. Returns null if
 * either parameter is null.
 * @param   {String[]} listA
 * @param   {String[]} listB
 * @returns {String[]|null}
 */
function intersection(listA, listB) {
  if (listA == null || listB == null) {
    return null;
  }
  
  let resultSet = [];
  
  for (let i = 0; i < listA.length; i++) {
    for (let j = 0; j < listB.length; j++) {
      if (listA[i] == listB[j]) {
        resultSet.push(listB[j]);
        break;
      }
    }
  }
  
  return resultSet;
}



/**
 * Returns an array of elements in listA not in listB. Returns null if either
 * array is null.
 * @param   {String[]} listA
 * @param   {String[]} listB
 * @returns {String[]|null}
 */
function relativeComplement(listA, listB) {
  if (listA == null || listB == null) {
    return null;
  }
  
  let resultSet = [];
  
  for (let i = 0; i < listA.length; i++) {
    let found = false;
    
    for (let j = 0; j < listB.length; j++) {
      if (listA[i] == listB[j]) {
        found = true;
        break;
      }
    }
    
    if (!found) {
      resultSet.push(listA[i]);
    }
  }
  
  return resultSet;
}



/**
 * Returns an array of elements that listA and listB do not have in common.
 * Returns null if either array is null.
 * @param   {String[]} listA
 * @param   {String[]} listB
 * @returns {String[]|null}
 */
function symmetricDifference(listA, listB) {
  if (listA == null || listB == null) {
    return null;
  }
  
  return relativeComplement(listA, listB)
    .concat(relativeComplement(listB, listA));
}



/**
 * Returns an array of all elements in listA and listB without duplicates.
 * Returns null if either array is null.
 * @param   {String[]} listA
 * @param   {String[]} listB
 * @returns {String[]|null}
 */
function union(listA, listB) {
  if (listA == null || listB == null) {
    return null;
  }
  
  return symmetricDifference(listA, listB)
    .concat(intersection(listA, listB));
}



})(document, document.window);