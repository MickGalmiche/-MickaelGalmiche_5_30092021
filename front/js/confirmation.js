// Recherche du produit avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);

if (params.has('orderId')) {

    let idProduct = params.get('orderId');
    let regex = /^(\w+-){4}\w{12}$/;

    if (idProduct.match(regex)) {
        document.getElementById('orderId').textContent = idProduct;
    } else {
        printError('Le numéro de commande n\'est pas valide');
    }

} else {
    printError('Aucune commande transmise');
}

// Affichage du message d'erreur
function printError(errorMessage) {
    let msgConfirmation = document.querySelector('.confirmation p');
    let message = document.createElement('p');
    message.textContent = errorMessage;
    document.querySelector('.confirmation').replaceChild(message, msgConfirmation);
}