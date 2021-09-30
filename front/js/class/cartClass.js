class Cart {

    constructor(key) {
        this.setKeyStorage(key);
        this.getList();
    }

    // Conversion de la liste d'articles stockée dans le Local Storage (string vers array)
    getArrayList(stringList) {
        this.listArray = JSON.parse(stringList);
    }

    // Initialisation de la propriété keyStorage pour l'accès au Local Storage
    setKeyStorage(key) {
        this.keyStorage = key;
    }

    // Création de la key dans le Local Storage
    createKeyStorage() {
        localStorage.setItem(this.keyStorage, '');
    }

    // Méthode initialisant la récupération du contenu du Local Storage
    getList() {
        this.list = localStorage.getItem(this.keyStorage);
        if(!this.list) {
            this.createKeyStorage(this.keyStorage);
            this.listArray = [];
        }else{
            this.getArrayList(this.list);
        }
        this.listLength = this.listArray.length;
    }

    // Evènement sur le bouton d'ajout au panier
    // Enregistrement des informations dans le localStorage (string d'objets)
    addToCart(product) {

        let productInCart = this.isInCart(product);
        if (this.listLength == 0 || !productInCart) {
            this.listArray.push(this.formatProductStorage(product));
        } else if (productInCart) {
            product.quantity += productInCart.quantity;
            this.listArray[productInCart.index] = this.formatProductStorage(product);
        } else {
            throw 'Impossible d\'ajouter cet article dans votre panier';
        }
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));




        /* if (this.listLength == 0) {
            // Si storage vide, on push le produit
            this.listArray.push(this.formatProductStorage(product));
        } else {
            let productInCart = this.isInCart(product);
            if (!productInCart){
                this.listArray.push(this.formatProductStorage(product));
            } else {
                product.quantity += productInCart.quantity;
                this.listArray[productInCart.index] = this.formatProductStorage(product);
            }
        }
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray)); */

    }

    // Méthode de vérification de présence d'un produit donné dans le storage
    isInCart(product) {
        let result = false;
        for (let i in this.listArray) {
            let item = JSON.parse(this.listArray[i]);

            // Vérification des ID/color
            if (product._id == item._id && product.color == item.color) {
                result = {
                    index: i,
                    quantity: item.quantity
                };
            }
        }
        return result;
    }

    // Formatage des éléments de la liste de produits qui seront stockés dans le localStorage
    formatProductStorage(product) {
        let stringProductObject = JSON.stringify({
            color: product.color,
            _id: product._id,
            quantity: product.quantity
        });
        return stringProductObject;
    }

}