# React

## [1] - Qu'est ce que React ?

- Librairie javascript pour créer des sites internet
- Rends les SPA très simple

## [2] - Installation

- Installer nodejs
- Vérifier les versions [node + npm]
- vscode + extensions

## [3] - Création du projet

`npx create-react-app {projet}`

- `node_modules` -> dossier ou tout les paquets installés iront (correspond au vendor)
- `public` -> tout les fichiers publics iront dedans
- `src` -> dossier source

## [4] - Lancement de l'application

`npm run start`

## [5] - Components

- Template + logique
- JSX
  - className ?
  - return seulement 1 élément

## [6] - Base du javascript

### Variables

- `const, let, var`
- `types` -> `nombres, variables, texte, booleen, objets, tableaux`

### Objets

`let person = {
    firstName: "John",
    lastName: "Doe",
    age: 20,
    nationality: "German"
}`

- `Object.entries(obj)`: retourne les clés + les valeurs d'un objet
- `Object.keys(obj)`: retourne les clés d'un objet
- `Object.values(obj)`: retourne les valeurs d'un objet

### Tableaux

`let persons = [person, person1, person2]`

- `concat()`: joindre plusieurs tableaux
- `indexOf()`: donne la position d'un élément
- `pop()`: retire le dernier element
- `push()`: ajoute un élément à la fin
- `reverse()`: retourne le tableau
- `shift()`: retire le premier élément
- `map()`: foreach spécial (item, index, tableau)

### Fonctions

- `function name(p1, p2, p3) {}`
- `const name = () => {}`

### Output

- `alert()`
- `confirm()`
- `console.log()`

## [7] - Valeurs dynamiques

- variables : `<p>{ variable }</p>`
- fonctions : `<p>{ Math.random() * 10 }</p>`
- paramètres : `<a href={ variable }>Google</a>`

## [8] - Components multiples

- Création
- Import

## [9] - Évenement de click

- sans invoquer la fonction: `onClick={fn()}` vs `onClick={fn}`

## [10] - Le State, hooks

Les données qu'utilise un component peuvent changer => utilisation du state

Sinon les données changent mais ne se rerendent pas

Hook : fonction de React, commencant par use

## [11] - Afficher le contenu d'un tableau

- utilisation de map
- propriété key

## [12] - Les props

- définition
- déstructurer son code

## [13] - Fonctions en props et callback

- comment passer d'un enfant à un parent

## [14] - Le hook d'effet

- Lancement au premier rendu
- Relancement à chaque update d'une variable
