/**
 * @param {required parameter(number). Equal current Order number} i 
 */
function showCurrentOrder(i) {
    var order = doc.querySelectorAll('.orders-list_item');
    for (var j = 0; j < Orders.length; j++) {
        //assign all orders css style "order: 1"
        order[j].style.order = '1';
    }
    //assign currnent order css style "order: 0"
    order[i].style.order = '0';
}
