/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showGeneralHeader(i, orderData) {
    var infoHeader = doc.getElementById('general-info_header');
    var templateForHeader = doc.querySelectorAll('.general-header-template')[0];
    var order = orderData[i]
    var sHTML = templateForHeader.innerHTML;
    
    var orderObj = {
        ORDER_ID: orderData['id'],
        ORDER_GET_PRICE: 
        // function () {
            fetchData('http://localhost:3000/api/Orders/' + orderData['id'] + '/products', 'GET')
                .then(function (orderData) {
                // debugger;
                    // return orderObj.ORDER_PRICE = calcMoney(orderData)
                    // return orderData
                return orderObj.ORDER_PRICE =  calcMoney(orderData)
                })
        // },
        ,
        ORDER_PRICE: this['ORDER_GET_PRICE'],
        
    };

    for (key in orderObj) {
        var replaceRegExp = new RegExp('{{' + key + '}}', 'g');
        sHTML = sHTML.replace(replaceRegExp, orderObj[key]);
    }
    infoHeader.innerHTML = sHTML;

    function calcMoney(orderData) {
        var products = orderData;

        var result = products.reduce(function (sum, current) {
            return sum + ATM(current.currency, +current.totalPrice);
        }, 0);
        return result.toFixed(2);
    }

    function ATM(currency, price) {
        switch (currency) {
            case 'EUR':
                return price;
            case 'RUB':
                return price / 72.55;
            case 'BYN':
                return price / 2.35;
            case 'USD':
                return price / 1.17;
            case 'UAH':
                return price / 30.54;
        }
    }
}
