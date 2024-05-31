# Application de Gestion des Assignements

Cette application web est conçue pour aider à la gestion des assignements dans un environnement éducatif ou professionnel. Elle permet aux professeurs de créer, visualiser, éditer et supprimer des assignements, ainsi que de suivre les rendus associés des étudiants. Les étudiants peuvent s'inscrire et rendre leurs devoirs tout en accédant à la liste des groupes et des assignements qui leur sont attribués. L'application est construite en utilisant le framework Angular 17.

## Fonctionnalités

- **Authentification**: Les utilisateurs doivent s'authentifier pour accéder à l'application. Un système de gardien d'authentification est mis en place pour protéger les routes nécessitant une connexion.

- **Gestion des assignements**: Les professeurs peuvent créer de nouvelles assignements, les visualiser en détail, les éditer et les supprimer.

- **Liste des assignements**: Une vue globale de toutes les assignements est disponible, permettant aux utilisateurs de parcourir rapidement les assignements existantes.

- **Gestion des Groupes**: La possibilité de créer et de gérer des groupes est intégrée à l'application, facilitant l'organisation des assignements par groupes d'utilisateurs. Les étudiants peuvent voir la liste des groupes auxquels ils appartiennent ainsi que les assignements associés à chaque groupe.

- **Tableau de Bord**: Un tableau de bord offre une vue d'ensemble de l'activité récente et des statistiques pertinentes concernant les assignements.

- **Gestion des Matières**: Les utilisateurs peuvent également gérer les différentes matières auxquelles les assignements sont liées, facilitant ainsi le classement et l'organisation.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et npm installés.
3. Exécutez `npm install` pour installer les dépendances du projet.
4. Exécutez `ng serve` pour lancer l'application en mode développement.
5. Accédez à `http://localhost:4200/` dans votre navigateur pour utiliser l'application.

## Structure du Projet
src/: Contient le code source de l'application.
app/: Le code source principal de l'application.
assets/: Les ressources statiques telles que les images et les fichiers de style.
environments/: Les fichiers de configuration pour les différents environnements (production, développement, etc.).

## Développement

- Ce projet a été développé en utilisant Angular, un framework JavaScript de développement d'applications web.
- Les composants principaux de l'application sont situés dans le répertoire `src/app`.
- Les routes de l'application sont définies dans le fichier `src/app/app-routes.ts`.
- Les services, les composants et les modules sont organisés de manière logique pour faciliter la maintenance et l'extension de l'application.

## Lien sur Render.com
https://assignementangularfront.onrender.com

## Connexion
Login Professeur, qui est aussi administateur de l'application:
```
    Identifiant: "prof"
    Mot de passe: "1234"
```
    
Login Etudiant:
```
    Identifiant: "flavienrakotoarison8@gmail.com"
    Mot de passe: "1234"
```

## Prérequis techniques
Version node : v18.17.1
Version d'angular : 17.2.2

## Auteurs
Ce projet a été développé par N° 21, RAKOTOARISON Tojo Fandresena Flavien et N°22, RAKOTOARIVONY Tendry Hery ny Aina
