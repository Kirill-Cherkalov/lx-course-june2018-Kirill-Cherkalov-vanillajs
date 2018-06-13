/**
 * 
 * @param {required parameter(number). Equal current Order number} i 
 */
function showBodyOfOrder(i, orderData) {
    // radioBtns (array)-> buttons collection
    var radioBtns = doc.getElementsByName('filter');
    for (var j = 0; j < radioBtns.length; j++) {
        (function (j) {
            if (radioBtns[j].checked) {
                switch (j) {
                    case 0:
                        show(i, 'shipTo', orderData);
                        break;
                    case 1:
                        show(i, 'customerInfo', orderData);
                        break;
                    case 2:
                        showMap(orderData);
                        break;
                }
            }
            radioBtns[j].onchange = function (ev) {
                //for other renders
                removeChildsOfElem('delivery-form', j);
                switch (j) {
                    case 0:
                        show(i, 'shipTo', orderData);
                        break;
                    case 1:
                        show(i, 'customerInfo', orderData);
                        break;
                    case 2:
                        showMap(orderData);
                        break;
                }
            }
        })(j);
    }
}

function showMap(orderData) {
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

function show(i, key, orderData) {
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