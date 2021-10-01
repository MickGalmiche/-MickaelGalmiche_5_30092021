class Cart {

    constructor(key) {
        this.setKeyStorage(key);
        this.getList();
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.listProducts = [];
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

    // Méthode d'enregistrement dans le localStorage
    registerInLocalStorage() {
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
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
        this.registerInLocalStorage();

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
        let stringProductObject = JSON.stringify(product);
        return stringProductObject;
    }
    
    // Injection des informations du produit dans le template HTML du panier
    printCartProduct(template, host, product) {

        let clone = document.importNode(template.content, true);
        clone.querySelector('.cart__item').setAttribute('data-id', product._id);
        clone.querySelector('.cart__item').setAttribute('data-color', product.color);
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
        document.querySelector('#totalQuantity').textContent = cart.totalQuantity;
        document.querySelector('#totalPrice').textContent = cart.totalPrice;
    }

    // Méthode parcourant la liste de produits du localStorage pour appliquer des actions (MAJ/suppresion)
    browseListArray(option, id, color, quantity=0) {
        for (let i in this.listArray) {
            let item = JSON.parse(this.listArray[i]);
            if (item._id == id && item.color == color) {
                
                switch (option) {
                    case 'update':
                        item.quantity = quantity;
                        this.listArray[i] = this.formatProductStorage(item);
                        break;
                    case 'remove':
                        this.listArray.splice(i, 1);
                        break;
                }

            }
        }
        this.registerInLocalStorage();
    }

    // Méthode de modification de la quantité dans le panier
    updateQuantity(id, color, quantity) {
        this.browseListArray('update', id, color, quantity);
        this.setTotal();
    }

    // Méthode de suppression d'un item du panier
    removeInCart(id, color) {
        this.browseListArray('remove', id, color)
        window.location.reload();
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