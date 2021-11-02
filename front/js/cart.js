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
    printError('Aucun article n\'a été ajouté à votre panier !');
}

// Ajout du montant et quantité totaux du panier
cart.printTotal();

// Event de suppression d'article
let deleteButtons = document.getElementsByClassName('deleteItem');
for (const item of deleteButtons) {
    item.addEventListener('click', (event) => {
        let product = {
            _id: event.target.closest('.cart__item').dataset.id,
            color: event.target.closest('.cart__item').dataset.color
        };
        cart.removeInCart(product);
        event.target.closest('.cart__item').remove();

        if (cart.listLength == 0) {
            printError('Aucun article n\'a été ajouté à votre panier !');
        };

    });
};

// Event de changement de quantité
let quantityButtons = document.getElementsByClassName('itemQuantity');
for (const item of quantityButtons) {
    item.addEventListener('change', (event) => {
        let product = {
            _id: event.target.closest('.cart__item').dataset.id,
            color: event.target.closest('.cart__item').dataset.color,
            quantity: Number(event.target.value)
        };
        cart.updateQuantity(product);
    })
}

// Event de suppression du panier
document
    .querySelector('#deleteCart')
    .addEventListener('click', () => {
        cart.clearCart();
    })

// Vérification de la validité de chaque champ du formulaire à chaque changement effectué
document
    .querySelector('.cart__order__form')
    .addEventListener('change', (event) => {
        cart.checkInputValidity(event.target);
    })

// Event de soumission de la commande avec envoi au backend
document
    .querySelector('.cart__order__form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();

        const url = "http://localhost:3000/api/products/order";
        const form = event.target;

        // Vérification de la présence d'article avant l'envoi
        // Mise en forme des données demandés par le banckend
            /* 
            //formatage de la requête de commande
             {
            	"contact": {
            		"firstName": "Test",
            		"lastName": "Test",
            		"address": "Test",
            		"city": "Test",
            		"email": "test@test.fr"
            		},
            	"products": [
            		"5be1ed3f1c9d44000030b061",
            		"5be1ef211c9d44000030b062"
            		]
            } */
        if (cart.listLength == 0) {
            alert('Votre panier est vide');
        } else if (cart.listLength >= 1 && cart.checkFormValidity(document.querySelector(".cart__order__form"))) {

            const formData = new FormData(form);
            let contactData = Object.fromEntries(formData.entries());
            
            const fetchOptions = {
                method: form.method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    contact: contactData,
                    products: cart.listProducts
                }),
            };

            // Requête API POST
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(response => {

                    // Création de l'url+ID de commande
                    let queryUrl = cart.getQueryUrl('orderId', response.orderId);

                    // Suppresion du panier à l'envoi des infos à l'API + Renvoi vers la page de commande
                    cart.clearCart();
                    window.location.href=`confirmation.html?${queryUrl}`; 
                });
        }
    })

// Affichage du message d'erreur
function printError(errorMessage) {
    let message = document.createElement('p');
    message.textContent = errorMessage;
    document.getElementById('cart__items').appendChild(message);
}