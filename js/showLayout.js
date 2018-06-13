function showOrders(orderData){
    var templateForOrder = doc.querySelectorAll('.order-template')[0];
    doc.querySelectorAll('.orders-title_numb')[0].innerHTML = orderData.length;
    for( var i = 0; i < orderData.length; i++ ) {
        var sHTML = templateForOrder.innerHTML;
        var order = orderData[i]['summary'];
        var orderObj = {
            ORDER_ID: orderData[i]['id'],
            ORDER_DATE:  order['createdAt'],
            CUSTOMER:  order['customer'],
            ORDER_STATUS:  order['status'],
            ORDER_SHIPPED:  order['shippedAt'],
            ORDER_STATUS_CLASS: function(){
                switch(order['status'].toUpperCase()) {
                    case 'Accepted'.toUpperCase():
                    return 'order-list_time';
                    case 'Pending'.toUpperCase():
                    return 'order-list_time order-list_time--urgent'
                }
            }
        };

        for( key in orderObj ) {
            var replaceRegExp = new RegExp('{{' + key +  '}}','g');
            sHTML = sHTML.replace(replaceRegExp, orderObj[key]);
        }

        var liTag = document.createElement("li");
        liTag.className = 'orders-list_item';
        liTag.innerHTML = sHTML;
        doc.getElementById("orders-list").appendChild(liTag);
    }
}
