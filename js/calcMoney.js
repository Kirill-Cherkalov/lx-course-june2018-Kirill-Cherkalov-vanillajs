// i is number of current Order
// counter -> total Price

/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function calcMoney(i) {
    var counter  = 0,
        products = Orders[i].products;
    for (var i = 0; i < products.length; i++) {
        counter += products[i].currency === 'EUR' ? +products[i].totalPrice : ATM(products[i].currency, products[i].price);
    }
    return counter.toFixed(2);
}

/**
 * 
 * @param {string} currency 
 * @param {number} numb 
 */
function ATM(currency, numb) {
    switch (currency) {
        case 'RUB':
            return numb / 72.55;
        case 'BYN':
            return numb / 2.35;
        case 'USD':
            return numb / 1.17;
        case 'UAH':
            return numb / 30.54;
    }
}
