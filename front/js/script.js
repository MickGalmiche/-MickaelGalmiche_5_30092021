const urlApi = 'http://localhost:3000/api/products'

// Requête API pour la liste de produits
fetch(urlApi)
    .then(responseApi)
    .then(data => data.json())
    .then(jsonListProduct => {

        // Récupération du template de la carte Produit
        let template = document.getElementById('itemTemplate');
        let host = document.getElementById('items');
        
        // Boucle parcourant chaque produit et créant un objet
        // Injection des valeurs de l'objet dans le template
        for(let jsonProduct of jsonListProduct) {
            let product = new Product(jsonProduct);
            product.printProductCard(template, host);
        }
    })
    .catch(error => {
        console.log(`${error.status} : ${error.statusText}`);
        printError('Aucun article à afficher !');
    })

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
    let message = document.createElement('p');
    message.textContent = errorMessage;
    document.getElementById('items').appendChild(message);
}