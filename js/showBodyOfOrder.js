/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showBodyOfOrder(i) {
    // radioBtns (array)-> buttons collection
    let radioBtns = doc.getElementsByName('filter');
    for (let j = 0; j < radioBtns.length; j++) {
        //for 1 render
        if(radioBtns[j].checked) {
            j === 0 ? showDeliveryInfo(i) : showCustomerInfo(i);
        }
        radioBtns[j].onchange = function (ev) {
            //for other renders
            removeChildsOfElem('general-info_list', j);
            j === 0 ? showDeliveryInfo(i) : showCustomerInfo(i);
        }
    }
}
