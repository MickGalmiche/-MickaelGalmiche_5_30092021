class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }

    // Création de l'URL individuel pour un produit
    getQueryUrl() {
        let queryUrl = new URLSearchParams();
        queryUrl.append('id', this._id);
        return queryUrl.toString();
    }

    // Injection des informations du produit dans le template HTML de la page d'accueil
    printProductCard(template, host) {

        let clone = document.importNode(template.content, true);
        clone.querySelector('a').setAttribute("href", `product.html?${this.getQueryUrl()}`);
        clone.querySelector('a article img').setAttribute("src",this.imageUrl);
        clone.querySelector('.productName').textContent = this.name;
        clone.querySelector('.productDescription').textContent = this.description;
        host.appendChild(clone);

    }
}