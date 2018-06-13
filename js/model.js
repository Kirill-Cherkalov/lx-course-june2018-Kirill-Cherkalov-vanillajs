var doc = document;
var ordersData = [];

var orderUrl = 'http://localhost:3000/api/Orders';
var method = 'GET';

fetchData(orderUrl, method)
    .then(function(orderData){
        ordersData = orderData;
        showOrders(orderData);
        MYAPP();
    })
    .catch(function(error){
        console.error(error);
    })




function fetchData(url, method, i, data) {
    return new Promise(function (resolve, reject) {
    typeof i !== 'undefined'?  url += ordersData[i]['id'] : null ;
        
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
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
