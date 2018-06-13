/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showDeliveryInfo(i, orderData) {
    var generalInfo = doc.querySelectorAll('.general-info-template')[0];
    var sHTML = generalInfo.innerHTML;
        var order = orderData['summary'];
        var orderObj = {
            ORDER_DATE:  order['createdAt'],
            CUSTOMER:  order['customer'],
            ORDER_SHIPPED:  order['shippedAt'],
        };

        for( key in orderObj ) {
            var replaceRegExp = new RegExp('{{' + key +  '}}','g');
            sHTML = sHTML.replace(replaceRegExp, orderObj[key]);
        }

        doc.querySelectorAll(".general-info_list")[0].innerHTML = sHTML;
}
