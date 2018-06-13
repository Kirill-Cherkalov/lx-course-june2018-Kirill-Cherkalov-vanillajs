/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 * @param {optional parameter(array with numbers)} matchesArray 
 */
function showTable(i, matchesArray, productData) {
    // debugger
    var tableItem = doc.querySelectorAll('.line-items_table-item-template')[0];
    var products = productData,
        tableTag = doc.querySelectorAll('.line-items_table')[0];
    var tableHeader = doc.querySelectorAll('.line-items_table-header-template')[0];
    tableTag.innerHTML = tableHeader.innerHTML;
    
    //if matchesArray is define, we choose him
    var result = typeof matchesArray !== 'undefined' ? matchesArray : products;
    doc.querySelectorAll('.product-line_number')[0].innerHTML = result.length;

    for (var l = 0; l < result.length; l++) {
        var sHTML = tableItem.innerHTML;
    //     /**
    //      * element of products array (products[j]) is object
    //      * element of matchesArray (matchesArray[j]) is number
    //      */
        var j = isNaN( result[l] ) ? l : result[l] ;

        var obj = {
            NAME:  products[j]['name'],
            ID:  products[j]['id'],
            VALUE:  products[j]['price'],
            CURRENCY:  products[j]['currency'],
            QUANTITY:  products[j]['quantity'],
            TOTAL_VALUE:  products[j]['totalPrice'],
        };

        for( key in obj ) {
            var replaceRegExp = new RegExp('{{' + key +  '}}','g');
            sHTML = sHTML.replace(replaceRegExp, obj[key]);
        }
        var trTag = doc.createElement('tr');
        trTag.className = 'line-table_item';
        trTag.innerHTML = sHTML;
        tableTag.appendChild(trTag);
    }
}
