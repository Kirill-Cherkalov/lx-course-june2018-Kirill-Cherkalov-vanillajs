function Controller(view, model) {
    /**
     * To bind the context
     */
    var that = this;

    /**
	 * Fetch the order object by id.
	 *
	 * @param {String} orderId the order id.
	 *
	 * @returns {Promise} the promise object will be resolved once the Order object gets loaded.
	 *
	 * @public
	 */

    that.start = function () {
            doc.addEventListener('DOMContentLoaded', function () {
                that._showLayout();
                that._addOrder();
            });
    };

    that._init = function () {

        var orderListCollection = view.getOrderListCollection();

        that._changeOrder = that._toggleClass();
        view._sort = view._sortTable();
        

        orderListCollection.forEach(function (elem, i) {
            (function (i) {
                elem.addEventListener('click', function () {
                    that._onSearchOrderClick(i, orderListCollection);
                    view._saveProduct = view._addProduct(i);
                    view.removeProduct = view._deleteProduct(i);
                    that._tableInit = that._tableInputInitial(i);
                });
            })(i);
        });

        var addProductBtn = doc.querySelectorAll('.product-line_button')[0];
        addProductBtn.addEventListener('click', function (ev) {
            view.removeClass(['.modal-product'], 'hidden');
        });

        var closeProductBtn = doc.querySelectorAll('.modal-product_button--close')[0];
        closeProductBtn.addEventListener('click', function (ev) {
            var modalProduct = doc.querySelectorAll('.modal-product')[0];
            modalProduct.classList.add('hidden');
        });

        var addOrderBtn = doc.querySelectorAll('.orders-footer_button--filter')[0];
        addOrderBtn.addEventListener('click', function (ev) {
            view.removeClass(['.modal-order'], 'hidden');
        })

        var closeOrderBtn = doc.querySelectorAll('.modal-order_button--close')[0];
        closeOrderBtn.addEventListener('click', function (ev) {
            var modalOrder = doc.querySelectorAll('.modal-order')[0];
            modalOrder.classList.add('hidden');
        })

        var editBodyBtn = doc.querySelectorAll('.delivery_button--edit')[0];
        editBodyBtn.addEventListener('click', function (ev) {
            var deliveryInputs = doc.querySelectorAll('.delivery-form_input');
            deliveryInputs.forEach(function (elem) {
                elem.removeAttribute('disabled');
            });
        })

        var orderInput = doc.querySelectorAll('.order-side_input')[0];
        var searchBtn = doc.querySelectorAll('.header_button--search')[0];
        orderInput.addEventListener('keyup', that._handleHeaderInput);
        searchBtn.addEventListener('click', that._handleHeaderInput);

    }

    that._onSearchOrderClick = function (i, collection) {
        if (that._changeOrder(collection, i)) {
            model.loadOrderById(i)
                .then(function (orderData) {
                    view.showGeneralHeader(i, orderData);
                    view.showDeliveryInfo(i, orderData);
                    that._showBodyOfOrder(i, orderData);
                    return model.loadProductsById(i);
                })
                .then(function(productData){
                    view.showTable(i, undefined, productData);
                    view.removeClass(['.general-info', '.delivery', '.product-line'], 'hidden');

                    view._sort(i, productData);
                    view._saveProduct(productData, that.addNewProduct, productData);
                    view.removeProduct(productData, that.removeProductFromTable);
                    that._deleteAllProducts(productData);
                    that._tableInit(productData);
                })

        } else {
            return
        }
    }

    that._showBodyOfOrder = function(i, orderData) {
        that.handleForm = view.handleShippingInfo(i);
        var radioBtns = view.getRadioBtns();
        for (var j = 0; j < radioBtns.length; j++) {
            (function (j) {
                if (radioBtns[j].checked) {
                    switch (j) {
                        case 0:
                            view.show(i, 'shipTo', orderData);
                            break;
                        case 1:
                            view.show(i, 'customerInfo', orderData);
                            break;
                        case 2:
                            view.showMap(orderData);
                            break;
                    }
                    that.handleForm(j, orderData, that.patchShippingField);
                }
                radioBtns[j].onchange = function (ev) {
                    view.removeChildsOfElem('delivery-form', j);
                    switch (j) {
                        case 0:
                            view.show(i, 'shipTo', orderData);
                            break;
                        case 1:
                            view.show(i, 'customerInfo', orderData);
                            break;
                        case 2:
                            view.showMap(orderData);
                            break;
                    }
                    that.handleForm(j, orderData);
                }
            })(j);
    }
    }

    that._tableInputInitial = function(j) {
        var i = j;
        return function (productData) {
            view.getTableInput();
            var order = Orders[i]['products'];
            tableInput.onkeyup = function (ev) {
                var matchesArray = [];
                for (var k = 0; k < order.length; k++) {
                    for (key in order[k]) {
                        if ((order[k][key].toUpperCase().indexOf(tableInput.value.toUpperCase())) >= 0) {
                            matchesArray.push(k)
                        }
                    }
                }
                matchesArray = sortMachesArray(matchesArray);
                
                view.removeChildsOfElem('line-items_table');
                showTable(i, matchesArray);
            }
        }
    }

    function sortMachesArray(array) {
        var obj = {};
    
        array.forEach(function(elem){
            obj[elem] = true;
        });
    
        return Object.keys(obj);
    }

    that._handleHeaderInput = function() {
        var matchesArray = [];
        var orderInfo = view.getOrderInfoKey();
        debugger
        for (var i = 0; i < Orders.length; i++) {
            for (key in Orders[i][OrderInfo]) {
                if ((Orders[i][OrderInfo][key].toUpperCase().indexOf(orderInput.value.toUpperCase())) >= 0) {
                    matchesArray.push(i)
                }
            }
        }
        matchesArray = sortMachesArray(matchesArray);
        that._showCurrentOrder(matchesArray);
    }

    that._showCurrentOrder = function(matchesArray) {
        var order = view.getOrderItem();
        var hidden = view.getHiddenClass()
        view.showCurrentOrderNumb(matchesArray.length);
        order.forEach(function(elem){
            elem.classList.add(hidden);
        });
    
        matchesArray.forEach(function(elem){
            order[elem].classList.remove(hidden);
        })
    }

    that._toggleClass = function () {
        var state = false;
        var previoustOrder = -1;
        var activeClass = view.getActiveClass();
        return function (collection, i) {
            if (!state) {
                collection[i].classList.add(activeClass);
                state = true;
                previoustOrder = i;
                return true;
            } else {
                if (previoustOrder === i) {
                    return false;
                } else {
                    collection.forEach(function (elem) {
                        elem.classList.contains(activeClass) ? elem.classList.remove(activeClass) : null;
                    });
                    collection[i].classList.add(activeClass);
                    view.clearInputFieldValue();
                    previoustOrder = i;
                    return true;
                }
            }
        }
    }

    that._showLayout = function () {
        model
            .getOrders()
            .then(function (ordersData) {
                view.showOrders(ordersData);
                that._init();
            })
    }

    that._deleteAllProducts = function(productData) {
        var deleteAllProductBtn = view.getDeleteProductsBtn();
        var orderId = view.getOrderIdKey();
        deleteAllProductBtn.onclick = function (ev) {
            model.deleteAllProducts(productData[0][orderId])
        } 
    }

    that._addOrder = function() {
        var addOrderBtn = view.getModalOrderBtnAdd();
        addOrderBtn.onclick = function () {
        var orderlabelsInput = view.getModalOrderInput();
        var obj = {};
        if (validateOrderInfo()) {
            obj = {
                "summary": {
                    "createdAt": orderlabelsInput[2].value,
                    "customer": orderlabelsInput[0].value,
                    "status": orderlabelsInput[1].value,
                    "shippedAt": orderlabelsInput[3].value,
                    "totalPrice": 0,
                    "currency": "EUR"
                },
                "shipTo": {
                    "name": "",
                    "address": "",
                    "ZIP": "",
                    "region": "",
                    "country": ""
                },
                "customerInfo": {
                    "firstName": "",
                    "lastName": "",
                    "address": "",
                    "phone": "",
                    "email": ""
                }
            }

            orderlabelsInput.forEach(function(elem){
                elem.value = '';
            })

            model.createNewOrder(obj)
            view.removeChildsOfElem('orders-list');
            that._showLayout();
        }
    }
    function validateOrderInfo() {
        return true;
    }
    }

    that.patchShippingField = function(data, id) {
        model.updateShippingInfo(data, id);
    }

    that.addNewProduct = function(data, id) {
        return model.updateProductsInfo(data, id);
    }

    that.removeProductFromTable = function(orderId, productId, i) {
        var info = model.removeProductById(orderId, productId);
        that.loadProductsById(orderId, i)
    }

    that.loadProductsById = function(orderId, i) {
        model.getProducts(orderId)
        .then(function(info) {
            view.removeChildsOfElem('line-items_table')
            view.showTable(i ,undefined, info);
        })
    }
}
var doc = document;
(new Controller(new View, new Model)).start();