Dans cet exercice, vous allez créer votre propre système de base de données basé sur le système de fichier en utilisant le format JSON, similaire à MongoDB. Vous allez créer une API avec ExpressJS pour effectuer des opérations telles que la récupération, la modification, la suppression et la recherche d'informations dans votre base de données.

### Partie 1: Création de la Base de Données JSON

1. **Créer la Structure de la Base de Données:**
   - Créez un fichier JSON à l'intérieur de ce dossier

   ```js
   JSON.stringify([]) // JS vers JSON
   JSON.parse('[]') // JSON vers JS

    // https://angular.fr/services/promise.html
    let maPromesse = new Promise((resolve, reject) => {
        let toutVaBien = true;
        
        if(toutVaBien) {
            resolve('La promesse est résolue !');
        } else {
            reject('La promesse est rejetée.');
        }
    });

    maPromesse
    .then(message => {
        console.log(message); // Affiche : 'La promesse est résolue !'
    })
    .catch(erreur => {
        console.log(erreur); // Ne sera pas affiché ici car la promesse est résolue
    });
   ```

2. **Manipuler la Base de Données:**
   - Écrire des fonctions pour:
     - Lire un fichier JSON et renvoyer son contenu.
     - Écrire dans un fichier JSON.
     - Supprimer un fichier JSON.
     - Rechercher des informations dans un fichier JSON.


     > Transformer les méthodes du module FS en méthodes asynchrones avec les promesses.

     3. **Création de Routes:**
   - Créez des routes pour effectuer les opérations CRUD (Create, Read, Update, Delete) sur votre base de données JSON.
     - Par exemple: `GET /users/:id` pour récupérer le contenu d'un fichier JSON, `POST /users` pour créer un nouveau fichier JSON, etc.

     ```js
     req.params.id
     ```

     4. **Worker**

     Pour améliorer les performances de votre application et éviter de bloquer le thread principal, vous décidez de déplacer cette fonction de recherche dans un Worker Node.js. De plus, pour gérer de manière asynchrone les résultats de la recherche, vous utiliserez des promesses.

> Note: Envoyez toute la liste des utilisateurs au Worker n’est pas forcément la meilleure solution. Le Worker pourrait-elle se charger de récupèrer la liste ? (c’est à dire création du tableau users dans le Worker)