/**
 * 
 * @param {array with domElements} tagsArray 
 * @param {array with strings} classNameArray 
 * @param {array with strings} textArray 
 */
function addElems(tagsArray, classNameArray, textArray) {
    //create array with tagsArray.length elements
    var textNodeArray = Array(tagsArray.length)
    for (var i = 0; i < tagsArray.length; i++) {
        tagsArray[i].className = classNameArray[i];
        textNodeArray[i] = doc.createTextNode(textArray[i]);
        tagsArray[i].appendChild(textNodeArray[i])
    }
}
