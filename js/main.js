(function MYAPP() {
    var ordersListCollection = doc.querySelectorAll('.orders-list_item');
    var changeOrder = toggleClass();

    //"listen" click on layout
    for (let i = 0; i < ordersListCollection.length; i++) {
        ordersListCollection[i].onclick = function (ev) {
            changeOrder(ordersListCollection, i);
            //Closure
            let tableInit = tableInputInitial(i);
            tableInit();
        }
    }

    var orderInput = doc.querySelectorAll('.order-side_input')[0];
    //"listen" keyup on input
    orderInput.onkeyup = function (ev) {
        //search for substring
        for (var i = 0; i < Orders.length; i++) {
            for (key in Orders[i]['OrderInfo']) {
                if ((Orders[i]['OrderInfo'][key].toUpperCase().indexOf(orderInput.value.toUpperCase())) >= 0) {
                    showCurrentOrder(i);
                    break;
                }
            }
        }
    }
    


})();