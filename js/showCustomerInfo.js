/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showCustomerInfo(i) {
    var infoList = doc.getElementById('general-info_list'),
        orders = Orders[i]['CustomerInfo'];
    for (var j = 0; j < 5; j++) {
        var liTag = doc.createElement('li'),
            spanTag = doc.createElement('span');
        switch (j) {
            case 0:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['FirstName: ', orders['firstName']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 1:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['LastName: ', orders['lastName']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 2:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Address: ', orders['address']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 3:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Phone: ', orders['phone']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
            case 4:
                addElems([liTag, spanTag], ['geteral-info_item', 'general-info_param'], ['Email: ', orders['email']]);
                insertIntoDom(infoList, liTag, spanTag);
                break;
        }
    }
}