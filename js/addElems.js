/**
 * 
 * @param {array with domElements} tagsArray 
 * @param {array with strings} classNameArray 
 * @param {array with strings} textArray 
 */
function addElems(tagsArray, classNameArray, textArray) {
    tagsArray.forEach((element, index) => {
        element.className = classNameArray[index];
        tagsArray[index].appendChild(doc.createTextNode(textArray[index]));
    });
}

function addElem(htmlElems, parent){
    var tagsArray  = htmlElems[0],
    classNameArray = htmlElems[1],
    textArray      = htmlElems[2];

    tagsArray.forEach((element, index) => {
        element.className = classNameArray[index];
        tagsArray[index].appendChild(doc.createTextNode(textArray[index]));
    });
    insertIntoDom(parent, tagsArray[0], tagsArray[1]);
}
