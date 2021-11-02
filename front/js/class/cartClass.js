class Cart {

    constructor(key) {
        this.setKeyStorage(key);
        this.getList();
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.listProducts = [];
        this.setTotal();
    }

    // Initialisation de la propriété keyStorage pour l'accès au Local Storage
    setKeyStorage(key) {
        this.keyStorage = key;
    }

    // Création de la key dans le Local Storage
    createKeyStorage() {
        localStorage.setItem(this.keyStorage, '[]');
    }
 
    // Conversion de la liste d'articles stockée dans le Local Storage (string vers array)
    getArrayList(stringList) {
        this.listArray = JSON.parse(stringList);
    }

    // Méthode initialisant la récupération du contenu du Local Storage
    getList() {
        this.list = localStorage.getItem(this.keyStorage);
        if(this.list == null) {
            this.createKeyStorage(this.keyStorage);
            this.listArray = [];
        }else{
            this.getArrayList(this.list);
        }
        this.listLength = this.listArray.length;
    }

    // Méthode d'enregistrement dans le localStorage
    registerInLocalStorage() {
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
    }

    // Formatage des éléments de la liste de produits qui seront stockés dans le localStorage
    formatProductStorage(product) {
        let stringProductObject = JSON.stringify(product);
        return stringProductObject;
    }
    
    // Injection des informations du produit dans le template HTML du panier
    printCartProduct(template, host, product) {

        let clone = document.importNode(template.content, true);
        clone.querySelector('.cart__item').setAttribute('data-id', product._id);
        clone.querySelector('.cart__item').setAttribute('data-color', product.color);
        clone.querySelector('.cart__item__img a').setAttribute('href', `product.html?${this.getQueryUrl('id', product._id)}`);
        clone.querySelector('.cart__item__img img').setAttribute('src', product.imageUrl);
        clone.querySelector('.cart__item__img img').setAttribute('alt', product.altTxt);
        clone.querySelector('h2').textContent = `${product.name} (${product.color})`;
        clone.querySelector('.cart__item__content__titlePrice p').textContent = `${product.price} €`;
        clone.querySelector('.itemQuantity').setAttribute('value', product.quantity);
        host.appendChild(clone);

    }

    // Méthode pour calculer le prix total du panier et le nombre total d'articles
    setTotal() {
        let price = 0;
        let quantity = 0;
        let productArray = [];
        for (let element of this.listArray) {
            let item = JSON.parse(element);
            price += (Number(item.price) * Number(item.quantity));
            quantity += Number(item.quantity);
            productArray.push(item._id);
        }

        this.totalQuantity = quantity;
        this.totalPrice = price;
        this.listProducts = productArray;
    }

    // Affichage des différents totaux
    printTotal() {
        this.setTotal();
        let printQuantity;
        if (this.totalQuantity <= 1) {
            printQuantity = `${this.totalQuantity} article`;
        } else {
            printQuantity = `${this.totalQuantity} articles`;
        };

        document.querySelector('#totalQuantity').textContent = `${printQuantity}`;
        document.querySelector('#totalPrice').textContent = this.totalPrice;
    }

    // Méthode parcourant la liste de produits du localStorage pour appliquer des actions (MAJ/suppresion)
    isInCart(option, product) {
        let result = false;
        for (let i in this.listArray) {
            let item = JSON.parse(this.listArray[i]);
            if (item._id == product._id && item.color == product.color) {
                
                // Si le produit est dans le panier (localStorage) :
                // Appliquer les modifications à l'item (ajouter de la quantité (add/update) ou suppression)
                switch (option) {
                    case 'update':
                        item.quantity = product.quantity;
                        this.listArray[i] = this.formatProductStorage(item);
                        break;
                    case 'remove':
                        this.listArray.splice(i, 1);
                        break;
                    case 'add':
                        // Demande de confirmation d'ajout de quantité d'un article déjà présent dans le panier
                        if(confirm('Ce produit est déjà dans votre panier ! Souhaitez-vous en ajouter d\'autres ?')) {
                            item.quantity += product.quantity;
                            this.listArray[i] = this.formatProductStorage(item);
                            break;
                        } else {
                            window.location.reload();
                        }
                }
                this.registerInLocalStorage();
                result = true;
                break;
            }
        }
        return result;
    }

    // Evènement sur le bouton d'ajout au panier
    // Enregistrement des informations dans le localStorage (string d'objets)
    addToCart(product) {
        let productInCart = this.isInCart('add', product);
        if (this.listLength == 0 || !productInCart) {
            this.listArray.push(this.formatProductStorage(product));
            this.registerInLocalStorage();
        }
    }

    // Méthode de modification de la quantité dans le panier
    updateQuantity(product) {
        this.isInCart('update', product);
        this.printTotal();
    }

    // Méthode de suppression d'un item du panier
    removeInCart(product) {
        this.isInCart('remove', product);
        this.printTotal();
        this.getList();
    }

    // Suppression du panier
    clearCart() {
        if (this.listLength && this.listLength >= 1) {
            this.listArray.splice(0, this.listLength);
            this.registerInLocalStorage();
            window.location.reload();
        }else{
            alert('Votre panier est déjà vide !');
        }
    }

    // Vérification de la validité des éléments du formulaire
    checkFormValidity(form) {
        let valid = true;
        for(let input of form) {
            valid &= input.checkValidity();
            if (!valid) {
                break;
            }
        }
        return valid;
    }

    //
    checkInputValidity(input) {
        let validity = input.reportValidity();
        if (!validity) {
            document.querySelector(`#${input.id}ErrorMsg`).textContent = input.validationMessage;
        } else {
            document.querySelector(`#${input.id}ErrorMsg`).textContent = '';
        }
    }

    // Création de l'URL avec paramètre personnalisé
    getQueryUrl(param, value) {
        let queryUrl = new URLSearchParams();
        queryUrl.append(param, value);
        return queryUrl.toString();
    }
}