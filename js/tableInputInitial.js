/**
 * 
 * @param {required parameter(number). Equal current Order number} j 
 */
function tableInputInitial(j) {
    //Each time you select Orders, this function is called and the j variable is pinned to search by object, not by DOM
    var i = j;
    return function () {
        //"listen" change on input
        var tableInput = doc.querySelectorAll('.product-line_input')[0];
        var order = Orders[i]['products'];
        tableInput.onkeyup = function (ev) {
            var matchesArray = [];
            //search for substring
            for (var k = 0; k < order.length; k++) {
                for (key in order[k]) {
                    if ((order[k][key].toUpperCase().indexOf(tableInput.value.toUpperCase())) >= 0) {
                        matchesArray.push(k)
                    }
                }
            }
            //sort because the elements can be repeated
            matchesArray = sortMachesArray(matchesArray);
            
            //remove all elements of table
            removeChildsOfElem('line-items_table');
            //insert new elements
            showTable(i, matchesArray);
        }
    }
}

/**
 * 
 * @param {array} array 
 */
function sortMachesArray(array) {
    var obj = {},
        result = [];
    //the property of the object is unique
    for (var i = 0; i < array.length; i++) {
        obj[array[i]] = true;
    }
    for (key in obj) {
        result.push(+key);
    }
    return result;
}