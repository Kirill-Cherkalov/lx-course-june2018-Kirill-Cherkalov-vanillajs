/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showDeliveryInfo(i) {
    var infoList = doc.getElementById('general-info_list');
    var orders = Orders[i]['OrderInfo'];
    for (var j = 0; j < 3; j++) {
        var liTag = doc.createElement('li');
        var spanTag = doc.createElement('span');
        switch (j) {
            case 0:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Customer: ', orders['customer']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 1:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Ordered: ', orders['createdAt']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 2:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Shipped: ', orders['shippedAt']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
        }
    }
}
