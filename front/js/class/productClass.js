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

    // Création de la balise IMG avec les informations du produit
    getImageTag(imageUrl, altTxt) {
        let image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        image.setAttribute('alt', altTxt);
        return image;
    }

    // Injection des informations du produit dans le template HTML de la page d'accueil
    printProductCard(template, host) {

        let clone = document.importNode(template.content, true);
        clone.querySelector('a').setAttribute("href", `product.html?${this.getQueryUrl()}`);
        clone.querySelector('a article img').setAttribute("src",this.imageUrl);
        clone.querySelector('a article img').setAttribute("alt",this.altTxt);
        clone.querySelector('.productName').textContent = this.name;
        clone.querySelector('.productDescription').textContent = this.description;
        host.appendChild(clone);

    }

    // Injection des informations du produit dans la page produit
    printProduct() {

        document.querySelector('.item__img').appendChild(this.getImageTag(this.imageUrl, this.altTxt));
        document.getElementById('title').textContent = this.name;
        document.getElementById('price').textContent = this.price;
        document.getElementById('description').textContent = this.description;
        this.printColors();

    }

    // Injection des choix de personnalisation (couleurs)
    printColors() {

        this.colors.forEach(color => {
            let optionColor = document.createElement('option');
            optionColor.setAttribute('value', color);
            optionColor.textContent = color;
            document.getElementById('colors').appendChild(optionColor);
        })

    }

    // Méthode définissant la couleur sélectionnée pour le produit
    setColor() {
        document.querySelectorAll('#colors option').forEach(option => {
            if (option.selected) {
                if (option.value != '') {
                    this.color = option.value;
                } else {
                    throw 'Veuillez choisir une couleur !';
                }
            }
        })
    }

    // Méthode définnisant la quantité sélectionnée de produit(s)
    setQuantity() {
        let quantity = document.getElementById('quantity');
        if (quantity.value >= 1) {
            this.quantity = Number(quantity.value);
        } else {
            throw 'Veuillez ajouter au moins un produit !';
        }
    }
}