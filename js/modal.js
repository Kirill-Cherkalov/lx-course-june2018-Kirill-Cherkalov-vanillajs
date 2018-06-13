/*-------------------------------In the development-----------------------------------------*/
var addProductBtn = doc.querySelectorAll('.product-line_button')[0];
addProductBtn.addEventListener('click', function (ev) {
    removeClass(['.modal-product'], 'hidden');
});

var closeProductBtn = doc.querySelectorAll('.modal-product_button--close')[0];
closeProductBtn.addEventListener('click', function (ev) {
    var modalProduct = doc.querySelectorAll('.modal-product')[0];
    modalProduct.classList.add('hidden');
});

var addOrderBtn = doc.querySelectorAll('.orders-footer_button--filter')[0];
addOrderBtn.addEventListener('click', function (ev) {
    removeClass(['.modal-order'], 'hidden');
})

var closeOrderBtn = doc.querySelectorAll('.modal-order_button--close')[0];
closeOrderBtn.addEventListener('click', function (ev) {
    var modalOrder = doc.querySelectorAll('.modal-order')[0];
    modalOrder.classList.add('hidden');
})

var saveProductBtn = doc.querySelectorAll('.modal-product_button--add')[0];

function addProduct(j) {
    var i = j;
    return function (productData) {
        
        saveProductBtn.addEventListener('click', function(ev) {
            
            var prodName = doc.querySelectorAll('.modal-product_input--name')[0].value;
            var unitPrice = doc.querySelectorAll('.modal-product_input--price')[0].value;
            var quantity = doc.querySelectorAll('.modal-product_input--quantity')[0].value;
            var currency = doc.querySelectorAll('.modal-product_input--currency')[0].value;

            var result = validateProductForm(prodName, unitPrice, quantity, currency);
            
            result === true ? null : showAngryMessadge();
            console.log(i, 'post product')
            
            var obj = {
                "name": prodName,
                "price": unitPrice,
                "currency": currency,
                "quantity": quantity,
                "totalPrice": +quantity * +unitPrice,
                // "orderId": productData[i]['orderId']
            }
            // fetchData('http://localhost:3000/api/Orders/' + productData[i]['orderId'] + '/products', 'POST', undefined, obj)
            // .then(function(productData) {
            //     // showTable(i, productData);
            // })

            // var sort = sortTable();
            // sort(i);

            prodName = '';
            unitPrice = '';
            quantity = '';
            currency = '';

            var modalProduct = doc.querySelectorAll('.modal-product')[0];
            modalProduct.classList.add('hidden');

        })
    }


    function validateProductForm(prodName, unitPrice, quantity, currency) {

    }

    function showAngryMessadge() {
        return
    }
}



