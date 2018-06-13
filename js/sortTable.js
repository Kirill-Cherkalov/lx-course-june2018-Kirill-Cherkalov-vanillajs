/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */


/**
 * obj.isAvtiveArray - отвечает за css свойство "opacity". Если 'true', то opacity = 1, если false opacity = 0.5
 * obj.isAvtiveArray - отвечает за css свойство "backgroundImage". Если 'true', то 'backgroundImage' выбирается по возрастанию. 
 * 
 */
function handleTableBtns(tableBtns, obj) {
    for (var j = 0; j < obj['isAvtiveArray'].length; j++) {
        if (obj['isAvtiveArray'][j] == true) {
            tableBtns[j].style.opacity = '1';
        } else {
            tableBtns[j].style.opacity = '0.5';
        }
    }
    for (var k = 0; k < obj['sortVectorArray'].length; k++) {
        if (obj['sortVectorArray'][k] == false) {
            tableBtns[k].style.backgroundImage = 'url("./img/sort-by-order.svg")';
        } else {
            tableBtns[k].style.backgroundImage = 'url("./img/sort-by-numeric-order.svg")';
        }
    }
    obj['sortVectorArray'][0] == false ? tableBtns[0].style.backgroundImage = "url('./img/sort-reverse-alphabetical-order.svg')" : tableBtns[0].style.backgroundImage = "url('./img/sort-by-alphabet.svg')";
}

/**
 * obj с двумя массивами для управления каждым столбцом таблицы.
 * Только один элемент  obj.isAvtiveArray может быть 'активным'(по которому производиться сортировка),
 * поэтому в начале производиться обнуление всех элементов до 'false'.
 * Если элемент массива obj.isAvtiveArray = 'true', то сортировка производится по возрастанию, если 'false', то по убыванию.
 */
function sortTable() {
    var obj = {
        isAvtiveArray: [false, false, false, false],
        sortVectorArray: [false, false, false, false]
    }
    return function (i, productData) {
        var tableHeader = doc.querySelectorAll('.line-items_header');
        // var order = Orders[i]['products'];
        var order = productData;
        var tableBtns = doc.querySelectorAll('.line-items_button');

        for (var j = 0; j < tableHeader.length; j++) {
            (function (j) {
                var array = [];
                tableHeader[j].onclick = function (ev) {
                debugger;

                    for (var k = 0; k < obj['isAvtiveArray'].length; k++) {
                        obj['isAvtiveArray'][k] = false;
                    }
                    array.length = 0;
                    switch (j) {
                        case 0:
                            for (var k = 0; k < order.length; k++) {
                                array.push(order[k]['name']);
                            }
                            obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                            obj.isAvtiveArray[j] = true;
                            handleTableBtns(tableBtns, obj);
                            obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                            findAndSort(order, i, array, 'name');
                            break;
                        case 1:
                            array = pushInArray(array, 'price', order);
                            obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                            obj.isAvtiveArray[j] = true;
                            handleTableBtns(tableBtns, obj);
                            obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                            findAndSort(order, i, array, 'price');
                            break;
                        case 2:
                            array = pushInArray(array, 'quantity', order);
                            obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                            obj.isAvtiveArray[j] = true;
                            handleTableBtns(tableBtns, obj);
                            obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                            findAndSort(order, i, array, 'quantity');
                            break;
                        case 3:
                            array = pushInArray(array, 'totalPrice', order);
                            obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                            obj.isAvtiveArray[j] = true;
                            handleTableBtns(tableBtns, obj);
                            obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                            findAndSort(order, i, array, 'totalPrice');
                            break;
                    }
                }
            })(j);
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
    for (var i = 0; i < order.length; i++) {
        array.push(+order[i][key]);
    }
    return array
}

function sIncrease(a, b) {
    if (a > b)
        return 1;
    else if (a < b)
        return -1;
    else
        return 0;
}

function sDecrease(a, b) {
    if (a > b)
        return -1;
    else if (a < b)
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
                // tableItems[order[j]].style.order = counter;
                tableItems[order[j]['orderId']].style.order = counter;
                counter++;
                // continue;
            }
        }
    }
}