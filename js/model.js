/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
function Model() {
    /**
     * To bind the context
     */
    var that = this;

	/**
	 * URL template for getting the orders from API service.
	 * @type {string}
	 *
	 * @private
	 */
    var _apiPrefix = 'http://localhost:3000/api';

    /**
	 * Method for http request
	 * @type {string}
	 *
	 * @private
	 */
    var _method_get = 'GET';

    /**
	 * Method for http request
	 * @type {string}
	 *
	 * @private
	 */
    var _method_delete = 'DELETE';

    /**
	 * Method for http request
	 * @type {string}
	 *
	 * @private
	 */
    var _method_post = 'POST';

    /**
	 * Method for http request
	 * @type {string}
	 *
	 * @private
	 */
    var _method_patch = 'PATCH'

    /**
	 * URL template for getting the orders from API service.
	 * @type {string}
	 *
	 * @private
	 */
    var _url_get_all_orders = _apiPrefix + '/Orders';

    that._ordersData = null;

    that._orderData = null;

    that._productData = null;

    that.removeProductById = function(orderId, productId) {
        var url = _url_get_all_orders + '/' + orderId  +'/products/' + productId;
        return that
                .fetchData(url, _method_delete)
                .then(function(){
                    var url = _url_get_all_orders + '/' + orderId + '/products'; 
                    return that
                            .fetchData(url, _method_get)
                            .then(function(productData) {
                                that._productData = productData
                                return productData;
                            })
                })
    }

    that.updateProductsInfo = function(data, id) {
        var url = _url_get_all_orders + '/' + id + '/products';
        return that.
                fetchData(url, _method_post)
                .then(function(productData) {
                    return productData;
                })
    }

    that.getProducts = function(orderId) {
        var url = _url_get_all_orders + '/' + orderId + '/products';
        return that
                    .fetchData(url, _method_get)
                    .then(function(productData) {
                        that._productData = productData
                        return productData;
                    }) 
    }

    that.updateShippingInfo = function(data, id) {
        var url = _url_get_all_orders + '/' + id;
        return that
            .fetchData(url, _method_patch, data)
    }

    that.createNewOrder = function(data) {
        return that
                .fetchData(_url_get_all_orders, _method_post, data)
                .then(function(orderData) {
                    return orderData;
                })
                .catch(function(error) {
                    console.error('Eror with adding new order'. error);
                })
    }

    that.getOrders = function () {
        return that
            .fetchData(_url_get_all_orders, _method_get)
            .then(function (ordersData) {
                that._ordersData = ordersData;
                return ordersData;
            })
    }

    that.loadOrderById = function (i) {
        var _url_get_order_by_id = _url_get_all_orders + '/' + that._ordersData[i]['id'];
        return that
            .fetchData(_url_get_order_by_id, _method_get)
            .then(function (orderData) {
                that._orderData = orderData;
                return orderData;
            })
    }

    that.deleteAllProducts = function(id) {
        var _url_delete_all_products = _url_get_all_orders + '/' + id + '/products';
        return that
                .fetchData(_url_delete_all_products, _method_delete)
                .then(function(){
                    return true;
                })
                .catch(function(error){
                    console.error('Problems with removind peroducts' + error)
                })
    }

    that.fetchData = function (url, method, data) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (xhr.status === 204) {
                    return resolve(undefined);;
                } else {
                    reject(new Error("Request failed: " + xhr.statusText));
                }
            });

            xhr.addEventListener("error", function () {
                reject(new Error("Network error"));
            });
            xhr.send(JSON.stringify(data));
        });
    }

    that.loadProductsById = function(i) {
        var _url_get_products_by_id =  _url_get_all_orders + '/' + that._ordersData[i]['id'] + '/products';
        return that
                .fetchData(_url_get_products_by_id, _method_get)
                .then(function(productData){
                    that._productData = productData;
                    return productData;
                })
    }
}
