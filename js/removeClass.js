/**
 * 
 * @param {*string. Contains a class which needs to be removed} className 
 */

function removeClass(parentArray, className) {
    parentArray.forEach(function(elem){
        doc.querySelectorAll(elem)[0].classList.remove(className);
    });
}
