let cart = new Cart('cartList');

// Affichage des produits du panier
if (cart.listLength >= 1) {
    for (const arrayItem of cart.listArray) {
        let product = JSON.parse(arrayItem);

        // Récupération du template de la carte Produit
        let template = document.getElementById('productCardTemplate');
        let host = document.getElementById('cart__items');
        cart.printCartProduct(template, host, product);
    }
} else {
    printError('Aucun article n\'a été ajouté à votre panier !')
}

// Ajout du montant et quantité totals du panier
cart.setTotal();

// Event de suppression d'article
let deleteButtons = document.getElementsByClassName('deleteItem');
for (const item of deleteButtons) {
    item.addEventListener('click', (event) => {
        let productId = event.target.closest('.cart__item').dataset.id;
        let productColor = event.target.closest('.cart__item').dataset.color;
        cart.removeInCart(productId, productColor);
    })
}

// Event de changement de quantité
let quantityButtons = document.getElementsByClassName('itemQuantity');
for (const item of quantityButtons) {
    item.addEventListener('change', (event) => {
        cart.updateQuantity(event.target.closest('.cart__item').dataset.id, event.target.closest('.cart__item').dataset.color, event.target.value);
    })
}

// Affichage du message d'erreur
function printError(errorMessage) {
    let message = document.createElement('p');
    message.textContent = errorMessage;
    document.getElementById('cart__items').appendChild(message);
}