/**
 * When porgram running state is false and the first part in the condition is fulfilled.
 * In other cases state is true and the second part in the condition is fulfilled.
 */
function toggleClass() {
    var state = false;
    return function (collection, i) {
        if (!state) {
            collection[i].classList.add('orders-list_item--active');
            showGeneralHeader(i);
            showBodyOfOrder(i);
            showShippingAdress(i);
            removeClass('hidden');
            showTable(i);
            sortTable(i);
            state = true;
        } else {
            for (var j = 0; j < collection.length; j++) {
                if (collection[j].classList.contains('orders-list_item--active')) {
                    collection[j].classList.remove('orders-list_item--active');
                    removeChildsOfElem('general-info_header');
                    removeChildsOfElem('general-info_list');
                    removeChildsOfElem('deliv-list');
                    removeChildsOfElem('line-items_table');
                    collection[i].classList.add('orders-list_item--active');
                    showGeneralHeader(i);
                    showBodyOfOrder(i);
                    showShippingAdress(i);
                    showTable(i);
                    sortTable(i);
                }
            }
        }
    }
}
