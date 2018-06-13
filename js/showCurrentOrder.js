/**
 * @param {required parameter(number). Equal current Order number} i 
 */

function showCurrentOrder(matchesArray) {
    var order = doc.querySelectorAll('.orders-list_item');
    doc.querySelectorAll('.orders-title_numb')[0].innerHTML = matchesArray.length;
    order.forEach(function(elem){
        elem.classList.add('hidden');
    });

    matchesArray.forEach(function(elem){
        order[elem].classList.remove('hidden');
    })
}