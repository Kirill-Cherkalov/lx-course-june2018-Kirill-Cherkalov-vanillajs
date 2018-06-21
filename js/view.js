function View(controller) {
    var that = this;

    var doc = document;

    var ORDER_LIST_COLLECTION_CLASS = 'orders-list_item';

    var ORDER_INPUT_FIELD_CLASS = 'order-side_input';

    var ORDER_SEARCH_BTN_CLASS = 'header_button--search';

    var TABLE_INPUT_FIELD_CLASS = 'product-line_input';

    var ORDER_ITEM_CLASS = 'orders-list_item';

    var ORDER_INFO_KEY = 'OrderInfo';

    var ORDER_ID_KEY = 'orderId';

    var ORDERS_NUMB_CLASS = 'orders-title_numb';

    var HIDDEN_CLASS = 'hidden';

    var ORDER_LIST_ACTIVE_CLASS = 'orders-list_item--active';

    var PRODUCT_LINE_INPUT_CLASS = 'product-line_input';

    var DELETE_ALL_PRODUCTS_BTN = 'general-footer_buttoon';

    var MODAL__ADD_ORDER__BTN_ADD = 'modal-order_button--add';

    var MODAL__ADD_ORDER__INPUT_FIELD = 'modal-order_input';

    var DELIVERY_BTN_SAVE = 'delivery_button--save';

    var DELIVERY_INPUT_FILED = 'delivery-form_input';

    var INPUT_FIELD_TYPE = 'filter';



    that.getRadioBtns = function() {
        return doc.getElementsByName(INPUT_FIELD_TYPE);
    }

    that.getModalOrderInput = function() {
        return doc.querySelectorAll('.' + MODAL__ADD_ORDER__INPUT_FIELD);
    }

    that.getModalOrderBtnAdd = function() {
        return doc.querySelectorAll('.' + MODAL__ADD_ORDER__BTN_ADD)[0];
    }

    that.getOrderIdKey = function() {
        return ORDER_ID_KEY;
    }

    that.getDeleteProductsBtn = function() {
        return doc.querySelectorAll('.' + DELETE_ALL_PRODUCTS_BTN)[0];
    }

    that.clearInputFieldValue = function() {
        doc.querySelectorAll('.' + PRODUCT_LINE_INPUT_CLASS)[0].value = '';
    }

    that.getActiveClass = function() {
        return ORDER_LIST_ACTIVE_CLASS;
    }

    that.getHiddenClass = function() {
        return HIDDEN_CLASS;
    }

    that.showCurrentOrderNumb = function (OrdersNumb) {
        doc.querySelectorAll('.' + ORDERS_NUMB_CLASS)[0].innerHTML = OrdersNumb;
    }

    that.getOrderItem = function() {
        return doc.querySelectorAll('.' + ORDER_ITEM_CLASS);
    }

    that.getOrderInfoKey = function() {
        return ORDER_INFO_KEY;
    }

    that.removeClass = function (parentArray, parentId) {
        parentArray.forEach(function (elem) {
            doc.querySelectorAll(elem)[0].classList.remove(parentId);
        });
    }

    that.getOrderListCollection = function () {
        return doc.querySelectorAll('.' + ORDER_LIST_COLLECTION_CLASS);
    }

    that.getTableInput = function() {
        return doc.querySelectorAll('.' + TABLE_INPUT_FIELD_CLASS)[0];
    }

    that.showOrders = function (orderData) {
        var templateForOrder = doc.querySelectorAll('.order-template')[0];
        doc.querySelectorAll('.orders-title_numb')[0].innerHTML = orderData.length;
        for (var i = 0; i < orderData.length; i++) {
            var sHTML = templateForOrder.innerHTML;
            var order = orderData[i]['summary'];
            var orderObj = {
                ORDER_ID: orderData[i]['id'],
                ORDER_DATE: order['createdAt'],
                CUSTOMER: order['customer'],
                ORDER_STATUS: order['status'],
                ORDER_SHIPPED: order['shippedAt'],
                ORDER_STATUS_CLASS: function () {
                    switch (order['status'].toUpperCase()) {
                        case 'Accepted'.toUpperCase():
                            return 'order-list_time';
                        case 'Pending'.toUpperCase():
                            return 'order-list_time order-list_time--urgent'
                    }
                }
            };

            for (key in orderObj) {
                var replaceRegExp = new RegExp('{{' + key + '}}', 'g');
                sHTML = sHTML.replace(replaceRegExp, orderObj[key]);
            }

            var liTag = document.createElement("li");
            liTag.className = 'orders-list_item';
            liTag.innerHTML = sHTML;
            doc.getElementById("orders-list").appendChild(liTag);
        }

    }


    that.showGeneralHeader = function (i, orderData) {
        var infoHeader = doc.getElementById('general-info_header');
        var templateForHeader = doc.querySelectorAll('.general-header-template')[0];
        var order = orderData[i]
        var sHTML = templateForHeader.innerHTML;

        var orderObj = {
            ORDER_ID: orderData['id'],
            ORDER_GET_PRICE: undefined,
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

    that.showDeliveryInfo = function (i, orderData) {
        var generalInfo = doc.querySelectorAll('.general-info-template')[0];
        var sHTML = generalInfo.innerHTML;
        var order = orderData['summary'];
        var orderObj = {
            ORDER_DATE: order['createdAt'],
            CUSTOMER: order['customer'],
            ORDER_SHIPPED: order['shippedAt'],
        };

        for (key in orderObj) {
            var replaceRegExp = new RegExp('{{' + key + '}}', 'g');
            sHTML = sHTML.replace(replaceRegExp, orderObj[key]);
        }

        doc.querySelectorAll(".general-info_list")[0].innerHTML = sHTML;
    }

    that.removeChildsOfElem = function(id) {
        var parent = doc.getElementById(id);
        while (parent.childNodes.length) {
            parent.removeChild(parent.childNodes[0]);
        }
    }

    that.handleShippingInfo = function(j) {
        var i = j;
        return function (currentTab, orderData, callback) {
            var saveBodyInfo = doc.querySelectorAll('.' + DELIVERY_BTN_SAVE)[0];
            saveBodyInfo.onclick = function (ev) {

                var deliveryInputs = doc.querySelectorAll('.' + DELIVERY_INPUT_FILED);
                var obj = {};
                if (validateDeliveryInfo()) {
                    if (currentTab === 0) {
                        obj = {
                            "shipTo": {
                                "name": deliveryInputs[0].value,
                                "address": deliveryInputs[1].value,
                                "ZIP": deliveryInputs[2].value,
                                "region": deliveryInputs[3].value,
                                "country": deliveryInputs[4].value
                            }
                        };
    
                    } else {
                        obj = {
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

                callback(obj, orderData['id']);
    
                function validateDeliveryInfo() {
                    return true
                }
            }
        }
    }

    that.showMap = function(orderData) {
            var some = doc.querySelectorAll('.some')[0];
            some.style.display = 'block';
            var myMap;
        
            var myGeocoder = ymaps.geocode(orderData['shipTo']['address']);
            myGeocoder.then(
                function (res) {
                    var arr = res.geoObjects.get(0).geometry.getCoordinates()
                    myMap = new ymaps.Map('map', {
                        center: [arr[0], arr[1]],
                        zoom: 10
                    }, {
                        searchControlProvider: 'yandex#search'
                    });
        
                },
            )
    }

    that.show = function(i, key, orderData) {
            var deliveryInfo = doc.querySelectorAll('.delivery-info-template')[0];
            var deliveyHeader = doc.querySelectorAll('.delivery_title')[0];
            var sHTML = deliveryInfo.innerHTML;
            var resultObj = {};
            var order = orderData[key];
            if (key === 'shipTo') {
                resultObj = {
                    PARAM_1: 'Name: ',
                    PARAM_2: 'Street: ',
                    PARAM_3: 'ZIP Code / City: ',
                    PARAM_4: 'Region: ',
                    PARAM_5: 'Country: ',
                    VALUE_PARAM_1: order['name'],
                    VALUE_PARAM_2: order['address'],
                    VALUE_PARAM_3: order['ZIP'],
                    VALUE_PARAM_4: order['region'],
                    VALUE_PARAM_5: order['country'],
                };
                deliveyHeader.innerHTML = 'Shipping Adress';
            } else {
                resultObj = {
                    PARAM_1: 'FirstName: ',
                    PARAM_2: 'LastName: ',
                    PARAM_3: 'Address: ',
                    PARAM_4: 'Phone: ',
                    PARAM_5: 'Email: ',
                    VALUE_PARAM_1: order['firstName'],
                    VALUE_PARAM_2: order['lastName'],
                    VALUE_PARAM_3: order['address'],
                    VALUE_PARAM_4: order['phone'],
                    VALUE_PARAM_5: order['email'],
                };
                deliveyHeader.innerHTML = 'Customer Info';
            }
        
            for (key in resultObj) {
                var replaceRegExp = new RegExp('{{' + key + '}}', 'g');
                sHTML = sHTML.replace(replaceRegExp, resultObj[key]);
            }
        
            doc.querySelectorAll(".delivery-form")[0].innerHTML = sHTML;
            doc.querySelectorAll('.some')[0].style.display = 'none';
    }

    that.showTable = function(i, matchesArray, productData) {
    var tableItem = doc.querySelectorAll('.line-items_table-item-template')[0];
    var products = productData,
        tableTag = doc.querySelectorAll('.line-items_table')[0];
    var tableHeader = doc.querySelectorAll('.line-items_table-header-template')[0];
    tableTag.innerHTML = tableHeader.innerHTML;
    
    var result = typeof matchesArray !== 'undefined' ? matchesArray : products;
    doc.querySelectorAll('.product-line_number')[0].innerHTML = result.length;

    for (var l = 0; l < result.length; l++) {
        var sHTML = tableItem.innerHTML;
        var j = isNaN( result[l] ) ? l : result[l] ;

        var obj = {
            NAME:  products[j]['name'],
            ID:  products[j]['id'],
            VALUE:  products[j]['price'],
            CURRENCY:  products[j]['currency'],
            QUANTITY:  products[j]['quantity'],
            TOTAL_VALUE:  products[j]['totalPrice'],
        };

        for( key in obj ) {
            var replaceRegExp = new RegExp('{{' + key +  '}}','g');
            sHTML = sHTML.replace(replaceRegExp, obj[key]);
        }
        var trTag = doc.createElement('tr');
        trTag.className = 'line-table_item';
        trTag.innerHTML = sHTML;
        tableTag.appendChild(trTag);
    }
    }

    that._sortTable = function() {
        var obj = {
            isAvtiveArray: [false, false, false, false],
            sortVectorArray: [false, false, false, false]
        }
        return function (i, productData) {
            var tableHeader = doc.querySelectorAll('.line-items_header');
            var order = productData;
            var tableBtns = doc.querySelectorAll('.line-items_button');
    
            for (var j = 0; j < tableHeader.length; j++) {
                (function (j) {
                    var array = [];
                    tableHeader[j].onclick = function (ev) {
                        for (var k = 0; k < obj['isAvtiveArray'].length; k++) {
                            obj['isAvtiveArray'][k] = false;
                        }
                        array.length = 0;
                        switch (j) {
                            case 0:
                                for (var k = 0; k < order.length; k++) {
                                    array.push(order[k]['name']);
                                }
                                obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                                obj.isAvtiveArray[j] = true;
                                handleTableBtns(tableBtns, obj);
                                obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                                findAndSort(order, i, array, 'name');
                                break;
                            case 1:
                                array = pushInArray(array, 'price', order);
                                obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                                obj.isAvtiveArray[j] = true;
                                handleTableBtns(tableBtns, obj);
                                obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                                findAndSort(order, i, array, 'price');
                                break;
                            case 2:
                                array = pushInArray(array, 'quantity', order);
                                obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                                obj.isAvtiveArray[j] = true;
                                handleTableBtns(tableBtns, obj);
                                obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                                findAndSort(order, i, array, 'quantity');
                                break;
                            case 3:
                                array = pushInArray(array, 'totalPrice', order);
                                obj.sortVectorArray[j] == false ? array.sort(sDecrease) : array.sort(sIncrease);
                                obj.isAvtiveArray[j] = true;
                                handleTableBtns(tableBtns, obj);
                                obj.sortVectorArray[j] = !obj.sortVectorArray[j];
                                findAndSort(order, i, array, 'totalPrice');
                                break;
                        }
                    }
                })(j);
            }
        }
        function pushInArray(array, key, order) {
            for (var i = 0; i < order.length; i++) {
                array.push(+order[i][key]);
            }
            return array
        }
        
        function sIncrease(a, b) {
            if (a > b)
                return 1;
            else if (a < b)
                return -1;
            else
                return 0;
        }
        
        function sDecrease(a, b) {
            if (a > b)
                return -1;
            else if (a < b)
                return 1;
            else
                return 0;
        }

        function findAndSort(order, i, array, key) {
            var tableItems = doc.querySelectorAll('.line-table_item');
            var counter = 0;
            for (var k = 0; k < array.length; k++) {
                for (var j = 0; j < order.length; j++) {
                    //searches for the first match of values and assigns the property in order
                    if (order[j][key] == array[k]) {
                        // tableItems[order[j]].style.order = counter;
                        tableItems[order[j]['orderId']].style.order = counter;
                        counter++;
                        // continue;
                    }
                }
            }
        }

        function handleTableBtns(tableBtns, obj) {
            for (var j = 0; j < obj['isAvtiveArray'].length; j++) {
                if (obj['isAvtiveArray'][j] == true) {
                    tableBtns[j].style.opacity = '1';
                } else {
                    tableBtns[j].style.opacity = '0.5';
                }
            }
            for (var k = 0; k < obj['sortVectorArray'].length; k++) {
                if (obj['sortVectorArray'][k] == false) {
                    tableBtns[k].style.backgroundImage = 'url("./img/sort-by-order.svg")';
                } else {
                    tableBtns[k].style.backgroundImage = 'url("./img/sort-by-numeric-order.svg")';
                }
            }
            obj['sortVectorArray'][0] == false ? tableBtns[0].style.backgroundImage = "url('./img/sort-reverse-alphabetical-order.svg')" : tableBtns[0].style.backgroundImage = "url('./img/sort-by-alphabet.svg')";
        }
    }

    that._addProduct = function(j) {
        var i = j;
        var saveProductBtn = doc.querySelectorAll('.modal-product_button--add')[0];
        return function (productData, callback, productDataa) {
            saveProductBtn.onclick = function (ev) {
                var prodName = doc.querySelectorAll('.modal-product_input--name')[0].value;
                var unitPrice = doc.querySelectorAll('.modal-product_input--price')[0].value;
                var quantity = doc.querySelectorAll('.modal-product_input--quantity')[0].value;
                var currency = doc.querySelectorAll('.modal-product_input--currency')[0].value;

                var result = validateProductForm(prodName, unitPrice, quantity, currency);

                result === true ? null : showAngryMessadge();
                var obj = {
                    "name": prodName,
                    "price": unitPrice,
                    "currency": currency,
                    "quantity": quantity,
                    "totalPrice": +quantity * +unitPrice,
                    "orderId": productData[i]['orderId']
                }

                var productData = callback(obj, productData[i]['orderId']);

                that.showTable(i, undefined, productData)

                prodName = '';
                unitPrice = '';
                quantity = '';
                currency = '';

                var modalProduct = doc.querySelectorAll('.modal-product')[0];
                modalProduct.classList.add('hidden');
            }
        }


        function validateProductForm(prodName, unitPrice, quantity, currency) {
            return true;
        }

        function showAngryMessadge() {
            return;
        }
    }

    that._deleteProduct = function(j) {
        var i = j;

        return function(productData, callback) {
        var deleteBtn = doc.querySelectorAll('.line-row_button');

            for(var j = 0; j < deleteBtn.length; j++) {
                (function(j){
                    deleteBtn[j].onclick = function(ev) {
                        callback( productData[j]['orderId'], productData[j]['id'], i);
                    }
                })(j);
            }
        }
    }

}