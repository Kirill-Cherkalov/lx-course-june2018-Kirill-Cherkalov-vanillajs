/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 * @param {optional parameter(array with numbers)} matchesArray 
 */
function showTable(i, matchesArray) {
    var products = Orders[i]['products'],
        tableTag = doc.querySelectorAll('.line-items_table')[0],
        startPos,
        lastPos;
    
    //if matchesArray is define, we choose him
    var result = matchesArray !== undefined ? matchesArray : products;
    doc.querySelectorAll('.product-line_number')[0].innerHTML = result.length;
    //show header of the table
    showTableHeader(tableTag);
    //render table info
    for (var l = 0; l < result.length; l++) {
        var trTag = doc.createElement('tr');
        trTag.className = 'line-table_item';
        /**
         * element of products array (products[j]) is object
         * element of matchesArray (matchesArray[j]) is number
         */
        j = typeof (result[l]) == 'number' ? result[l] : l;
        for (var k = 0; k < 4; k++) {
            var tdTag = doc.createElement('td');
            var spanTag = doc.createElement('span');
            switch (k) {
                case 0:
                    tdTag.appendChild(spanTag);
                    addElems([spanTag, tdTag], ['product_name', 'line-items_product'], [products[j]['name'], products[j]['id']]);
                    break;
                case 1:
                    tdTag.appendChild(spanTag);
                    addElems([spanTag, tdTag], ['items-price_value', 'line-items_price'], [products[j]['price'] + ' ', products[j]['currency']]);
                    break;
                case 2:
                    addElems([tdTag], ['line-items_quantity'], [products[j]['quantity']]);
                    break;
                case 3:
                    tdTag.appendChild(spanTag);
                    addElems([spanTag, tdTag], ['items-total_value', 'line-items_total'], [products[j]['totalPrice'] + ' ', products[j]['currency']]);
                    break;
            }
            trTag.appendChild(tdTag);
        }
        tableTag.appendChild(trTag);
    }
}

function showTableHeader(tableTag) {
    var trTag = doc.createElement('tr');
    trTag.className = 'line-table_item';
    for (var ii = 0; ii < 4; ii++) {
        var thTag = doc.createElement('th');
        switch (ii) {
            case 0:
                addElems([thTag], ['line-items_header'], ['Products']);
                break;
            case 1:
                addElems([thTag], ['line-items_header'], ['Unit Price']);
                break;
            case 2:
                addElems([thTag], ['line-items_header'], ['Quantity']);
                break;
            case 3:
                addElems([thTag], ['line-items_header'], ['Total']);
                break;
        }
        trTag.appendChild(thTag);
    }
    tableTag.appendChild(trTag);
}
