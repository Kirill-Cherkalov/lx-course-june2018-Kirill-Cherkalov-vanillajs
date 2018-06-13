function MYAPP() {

    var ordersListCollection = doc.querySelectorAll('.orders-list_item');
    var changeOrder = toggleClass();
    var sort = sortTable();
    for (var i = 0; i < ordersListCollection.length; i++) {
        (function (i) {
            ordersListCollection[i].addEventListener('click', function (ev) {
                
                if (changeOrder(ordersListCollection, i)) {
                        var saveProduct = addProduct(i);
                    
                    fetchData('http://localhost:3000/api/Orders/', 'GET', i)
                        .then(function (orderData) {
                            removeClass(['.general-info', '.delivery', '.product-line'], 'hidden')
                            showGeneralHeader(i, orderData);
                            showDeliveryInfo(i, orderData);
                            showBodyOfOrder(i, orderData);

                            return (fetchData('http://localhost:3000/api/Orders/' + ordersData[i]['id'] + '/products', 'GET'));
                        })
                        .then(function (productData) {
                            showTable(i, undefined, productData);
                            sort(i, productData);
                            console.log(i, 'main');

                        })
                } else {
                    return;
                }
                // saveProduct();

                //Closure пока не работает
                // var tableInit = tableInputInitial(i);
                // tableInit();
            })
        })(i);
    }

    var orderInput = doc.querySelectorAll('.order-side_input')[0];
    var searchBtn = doc.querySelectorAll('.header_button--search')[0];
    //"listen" keyup on input
    orderInput.addEventListener('keyup', handleHeaderInput);
    searchBtn.addEventListener('click', handleHeaderInput);

    function handleHeaderInput() {
        //search for substring
        var matchesArray = [];
        for (var i = 0; i < Orders.length; i++) {
            for (key in Orders[i]['OrderInfo']) {
                if ((Orders[i]['OrderInfo'][key].toUpperCase().indexOf(orderInput.value.toUpperCase())) >= 0) {
                    matchesArray.push(i)
                }
            }
        }
        matchesArray = sortMachesArray(matchesArray);
        showCurrentOrder(matchesArray);
    }


/*-------------------------------In the development-----------------------------------------*/
    var editBodyBtn = doc.querySelectorAll('.delivery_button--edit')[0];
    editBodyBtn.addEventListener('click', function (ev) {
        var deliveryInputs = doc.querySelectorAll('.delivery-form_input');

        deliveryInputs.forEach(function (elem) {
            elem.removeAttribute('disabled');
        });
    })

    var saveBodyInfo = doc.querySelectorAll('.delivery_button--save')[0];
    //сделать замыкание от выбора иконки customer или truck
    //параметром будет btn либо 0, либо 1
    var btn = 0;
    saveBodyInfo.addEventListener('click', function (ev) {
        var deliveryInputs = doc.querySelectorAll('.delivery-form_input');

        if(validateDeliveryInfo()) {
            if(btn === 0){
                var obj = {
                    "shipTo": {
                        "name": deliveryInputs[0].value,
                        "address":deliveryInputs[1].value,
                        "ZIP": deliveryInputs[2].value,
                        "region": deliveryInputs[3].value,
                        "country": deliveryInputs[4].value
                      }
                };
                
            } else {
                var obj = {
                    "customerInfo": {
                        "firstName": deliveryInputs[0].value,
                        "lastName": deliveryInputs[1].value,
                        "address": deliveryInputs[2].value,
                        "phone": deliveryInputs[3].value,
                        "email": deliveryInputs[4].value
                      }
                }
            }
        } else {
            return;
        }
        
        deliveryInputs.forEach(function (elem) {
            elem.setAttribute('disabled', '');
        });

        //  fetchData('http://localhost:3000/api/Orders/ + productData[i]['orderId'] ', 'POST', undefined, obj)
            // .then(function(productData) {
            // перерендор области
            // })
     
    })

    function validateDeliveryInfo() {
        return true
    }


}

