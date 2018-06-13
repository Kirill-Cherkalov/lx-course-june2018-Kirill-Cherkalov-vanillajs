/**
 * When porgram running state is false and the first part in the condition is fulfilled.
 * In other cases state is true and the second part in the condition is fulfilled.
 */
function toggleClass() {
    var state = false;
    var previoustOrder = -1;
    return function (collection, i, orderData) {
        if (!state) {
            collection[i].classList.add('orders-list_item--active');
            removeClass(['.general-info', '.delivery', '.product-line'], 'hidden');
            state = true;
            previoustOrder = i;
            return true;
        } else {
            if (previoustOrder === i) {
                return false;
            } else {
                collection.forEach(function (elem) {
                    elem.classList.contains('orders-list_item--active') ? elem.classList.remove('orders-list_item--active') : null;
                });
                // removeChildsOfElem('general-info_header');
                // removeChildsOfElem('general-info_list');
                // removeChildsOfElem('delivery-form');
                // removeChildsOfElem('line-items_table');
                collection[i].classList.add('orders-list_item--active');
                doc.querySelectorAll('.product-line_input')[0].value = '';
                previoustOrder = i;
                return true;
            }
        }
    }
}


