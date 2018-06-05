(function showLayout() {
    var orderNumb = doc.querySelectorAll('.orders-title_numb');
    orderNumb[0].innerHTML = '(' + Orders.length + ')';

    for (var i = 0; i < Orders.length; i++) {
        var order = Orders[i]['OrderInfo'],
            liTag = doc.createElement('li');

        liTag.className = 'orders-list_item';
        for (var j = 0; j < 3; j++) {
            var pTag    = doc.createElement('p'),
                spanTag = doc.createElement('span');

            switch (j) {
                case 0:
                    addElems([pTag, spanTag], ['order-list_name', 'order-list_date'], ['Order ' + Orders[i]['id'], order['createdAt']]);
                    insertIntoDom(liTag, pTag, spanTag);
                    break;
                case 1:
                    var className = checkTime(order['status']);
                    addElems([pTag, spanTag], ['order-list_place', className], [order['customer'], order['status']]);
                    insertIntoDom(liTag, pTag, spanTag);
                    break;
                case 2:
                    addElems([pTag], ['order-list_shipped'], ['Shipped: ' + order['shippedAt']])
                    liTag.appendChild(pTag);
                    break;
            }
        }
        doc.getElementById("orders-list").appendChild(liTag);
    }
})();
