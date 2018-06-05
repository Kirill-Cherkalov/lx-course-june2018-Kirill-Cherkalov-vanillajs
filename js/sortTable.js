/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function sortTable(i) {
    var tableHeader = doc.querySelectorAll('.line-items_header');
    var order = Orders[i]['products'];
    for (let j = 0; j < tableHeader.length; j++) {
        var array = [];
        tableHeader[j].onclick = function (ev) {
            array.length = 0;
            switch (j) {
                case 0:
                    for (var k = 0; k < order.length; k++) {
                        array.push(order[k]['name']);
                    }
                    array.sort();
                    findAndSort(order, i, array, 'name');
                    break;
                case 1:
                    array = pushInArray(array, 'price', order);
                    array.sort(sDecrease);
                    findAndSort(order, i, array, 'price');
                    break;
                case 2:
                    array = pushInArray(array, 'quantity', order);
                    array.sort(sDecrease);
                    findAndSort(order, i, array, 'quantity');
                    break;
                case 3:
                    array = pushInArray(array, 'totalPrice', order);
                    array.sort(sDecrease);
                    findAndSort(order, i, array, 'totalPrice');
                    break;
            }
        }
    }
}
/**
 * 
 * @param {the array in which to put the value} array 
 * @param {the value by which to sort} key 
 * @param {data.js object} order 
 */
function pushInArray(array, key, order) {
    for (var k = 0; k < order.length; k++) {
        array.push(parseInt(order[k][key], 10));
    }
    return array
}

function sDecrease(i, ii) {
    if (i > ii)
        return -1;
    else if (i < ii)
        return 1;
    else
        return 0;
}
/**
 * 
 * @param {data.js object} order 
 * @param {required parameter(number). Equal current Order number} i 
 * @param {array to be sorted} array 
 * @param {the value by which to sort} key 
 */
function findAndSort(order, i, array, key) {
    var tableItems = doc.querySelectorAll('.line-table_item');
    var counter = 0;
    for (var k = 0; k < array.length; k++) {
        for (var j = 0; j < order.length; j++) {
            //searches for the first match of values and assigns the property in order
            if (order[j][key] == array[k]) {
                tableItems[order[j]['id']].style.order = counter;
                counter++;
            }
        }
    }

}