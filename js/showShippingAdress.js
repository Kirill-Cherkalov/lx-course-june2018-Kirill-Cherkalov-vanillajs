/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showShippingAdress(i) {
    var shippingList = doc.getElementById('deliv-list'),
        order        = Orders[i]['ShipTo'];
    
    for( var j = 0; j < 5; j++ ) {
        var liTag   = doc.createElement('li'),
            spanTag = doc.createElement('span');

        switch(j) {
            case 0:
            addElems( [spanTag], ['deliv_param'], ['Name:'] );
            insertIntoDom(shippingList, liTag, spanTag);
            addElems( [liTag], ['deliv_item'] , [order['name']] );
            break;
            case 1:
            addElems( [spanTag], ['deliv_param'], ['Street:'] );
            insertIntoDom(shippingList, liTag, spanTag);
            addElems( [liTag], ['deliv_item'] , [order['Address']] );
            break;
            case 2:
            addElems( [spanTag], ['deliv_param'], ['ZIP Code / City:'] );
            insertIntoDom(shippingList, liTag, spanTag);
            addElems( [liTag], ['deliv_item'] , [order['ZIP']] );
            break;
            case 3:
            addElems( [spanTag], ['deliv_param'], ['Region:'] );
            insertIntoDom(shippingList, liTag, spanTag);
            addElems( [liTag], ['deliv_item'] , [order['Region']] );
            break;
            case 4:
            addElems( [spanTag], ['deliv_param'], ['Country:'] );
            insertIntoDom(shippingList, liTag, spanTag);
            addElems( [liTag], ['deliv_item'] , [order['Country']] );
            break;
        }
    }
};