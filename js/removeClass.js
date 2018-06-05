/**
 * 
 * @param {*string. Contains a class which needs to be removed} className 
 */
function removeClass(className) {
    switch (className) {
        case 'hidden':
            doc.getElementsByClassName('general-info')[0].classList.remove('hidden');
            doc.getElementsByClassName('delivery')[0].classList.remove('hidden');
            doc.getElementsByClassName('product-line')[0].classList.remove('hidden');
            break;
    }
}
