// Recherche du produit avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);

if (params.has('id')) {
    
    let idProduct = params.get('id');
    let regex = /^\w+$/;

    if (idProduct.match(regex)) {

        const urlApi = `http://localhost:3000/api/products/${idProduct}`;

        // Requête API pour obtenir les information d'un produit
        fetch(urlApi)
            .then(responseApi)
            .then( data => data.json())
            .then(jsonProduct => {

                // Création de l'objet du produit et application des méthodes (affichage via injection des valeurs dans le template)
                let product = new Product(jsonProduct);
                product.printProduct();

            })
            .catch(error => {
                printError(`${error.status} ${error.statusText} - Cet article n'existe pas!`);
            })
    } else {
        printError('Cet article n\'existe pas!');
    }
} else {
    printError('Aucun article à afficher !');
}

// Vérification de la réponse de l'API et message d'erreur
function responseApi(response) {
    if (!response.ok) {
        // throw Error(response.statusText);
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        })
    } else {
        return response;
    }
}

// Affichage du message d'erreur
function printError(errorMessage) {
    let productCard = document.querySelector('.item article');
    let message = document.createElement('article');
    message.textContent = errorMessage;
    document.querySelector('.item').replaceChild(message, productCard);
}