/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showGeneralHeader(i) {
    var pTag = doc.createElement('p');
    var infoHeader = doc.getElementById('general-info_header');
    for (var j = 0; j < 2; j++) {
        var pTag = doc.createElement('p');
        var spanTag = doc.createElement('span');
        switch (j) {
            case 0:
                addElems([pTag], ['general-info_order-numb'], ['Order ' + Orders[i]['id']]);
                infoHeader.appendChild(pTag);
                break;
            case 1:
                addElems([pTag, spanTag], ['general-info_price', 'general-info_currency'], [calcMoney(i), 'EUR']);
                insertIntoDom(infoHeader, pTag, spanTag);
                break;
        }
    }
}