# Kanap - projet Openclassrooms

Cinquième projet du parcours **développeur web** chez **Openclassrooms**, dont l'objectif est de participer à la construction d'un site de e-commerce en intégrant dynamiquement les éléments d'une API avec Javascript, et en réalisant un plan de test d'acceptation.

![maquette kanap](kanap-screenshot.png)

## Éléments fournis par l'entreprise virtuelle
- Le code du backend (API) et la structure HTML/CSS du frontend sont fournis dans un [repository Github](https://github.com/OpenClassrooms-Student-Center/P5-Dev-Web-Kanap).
- Les spécifications de l'application (architecture, API, plan de tests) sont également mises à disposition [(fichier PDF à télécharger)](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/DW+P5+-+Specifications+fonctionnelles.pdf).
- [Un template](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/DW+P5+-+Modele+plan+tests+acceptation.xlsx) pour la mise en place du plan de test d'acceptation.


## Installation et usage
- Cloner le [repository](https://github.com/MickGalmiche/MickaelGalmiche_5_30092021)
- Se déplacer dans le  dossier *back*
- Lancer la commande `npm install`
- Lancer le serveur de l'API avec la commande `node server`. Il devrait démarrer à l'adresse `localhost` avec le port par défaut `3000`. Un message s'affichera dans la console pour indiquer le port utilisé.

## Cahier des charges

### Fonctionnalités et contenu
- Page d'accueil
    - Affichage de tous les articles disponibles à la vente de manière dynamique
    - Chaque vignette (composée d'une image, d'un nom et d'un résumé de la description) redirige vers la page spécifique du produit correspondant
- Page *Produit*
    - Affichage du produit sélectionné avec ses détails (nom, prix, description complète)
    - Le choix d'une quantité (input) et d'une personnalisation (menu déroulant avec les options de couleur) sont proposées à l'utilisateur
    - Un bouton permet l'ajout du produit dans le panier
    - L'ajout d'un produit déjà présent dans le panier (même modèle et couleur) doit uniquement modifier sa quantité
- Page *Panier*
    - Affichage d'un résumé des produits ajoutés dans le panier, regroupés par modèle et par couleur.
    - L'utilisateur peut procéder à une modification de la quantité du produit. Les totaux (montant et nombre d'articles) seront mis à jour en conséquence.
    - La suppression d'un produit est également disponible. L'élément doit disparaître du panier.
    - Un formulaire permet de valider la commande. Les données doivent être vérifiées (format, type de données)
- Page de confirmation
    - Affichage d'un message de confirmation de commande (avec un identifiant renvoyé par l'API), ainsi qu'un remerciement pour l'utilisateur.

### Contraintes techniques
- Utilisation de Javascript Vanilla uniquement (les frameworks ou librairies Javascript ne sont pas autorisés).
- L'ensemble de la structure HTML et CSS est fourni, y compris des éléments dynamiques. Seule l'intégration de ces derniers avec Javascript est nécessaire.
- Indenter le code est indispensable.
- Découper le code en plusieurs fonctions nommées, courtes, réutilisables, et répondant à un besoin précis (principe DRY).
- Commenter chaque fonction pour décrire son rôle.

- Pour les appels à l'API, utiliser les promesses pour éviter les callbacks (l'aternative Fetch est une solution).
- La requête POST pour confirmer la commande ne prend pas encore en considération la quantité et la personnalisation des produits.
