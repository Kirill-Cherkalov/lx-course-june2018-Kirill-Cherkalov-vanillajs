/**
 * 
 * @param {*string. Contains the class of the element whose child need to delete} className 
 */
function removeChildsOfElem(className) {
    var parent = doc.getElementById(className);
    while (parent.childNodes.length) {
        parent.removeChild(parent.childNodes[0]);
    }
}