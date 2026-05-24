# Star Wars Explorer

## Projectbeschrijving

Star Wars Explorer is een interactieve single page application gemaakt met JavaScript, CSS en Vite.

De applicatie gebruikt de SWAPI API om Star Wars personages op te halen en weer te geven in een moderne interface. Gebruikers kunnen personages zoeken, filteren, sorteren en toevoegen aan favorieten.

De applicatie maakt gebruik van moderne JavaScript concepten zoals async/await, fetch, array methods, template literals, LocalStorage en de Observer API.

Het project werd ontwikkeld voor het vak Web Advanced.

# Functionaliteiten

## Dataverzameling & weergave

- Data ophalen via SWAPI API
- Meer dan 20 characters ophalen
- Characters weergeven in cards
- Detail popup (modal)
- Responsive layout

## Interactiviteit

- Zoekfunctie
- Filter op gender
- Sorteren van A-Z en Z-A
- Combinatie van filter + sort + search

## Personalisatie

- Favorites systeem
- Favorieten opslaan via LocalStorage
- Data bewaren tussen sessies

## Gebruikerservaring

- Responsive design
- Hover effecten
- Observer animaties
- Gebruiksvriendelijke interface
- Modal popup voor extra informatie

# Gebruikte API

## SWAPI

Star Wars API:

https://swapi.py4e.com/

Gebruikte endpoint:

https://swapi.py4e.com/api/people/

# Technische vereisten

## DOM Manipulatie

### Elementen selecteren

```js
const app = document.querySelector("#app");
```
Locatie:
src/main.js

### Elementen manipuleren

```js
app.innerHTML = `
`
```
Locatie:
render()

### Events koppelen

```js
searchInput.oninput = (e) => {}
```

```js
filterSelect.onchange = (e) => {}
```

```js
sortSelect.onchange = (e) => {}
```

Locatie:
attachEvents()

# Modern JavaScript

## Constanten

```js
const app = document.querySelector("#app");
```

## Template literals

```js
`${char.name}`
```

## Iteratie over arrays

```js
characters.map(char => {})
```

## Array methods

```js
filter()
map()
find()
some()
```

## Arrow functions

```js
(entry) => {}
```

## Conditional ternary operator

```js
isFav ? "Remove" : "Favorite"
```

## Callback functions

```js
entries.forEach(entry => {})
```

## Promises

```js
Promise.all()
```

## Async & Await

```js
async function getCharacters()
```

## Observer API

```js
new IntersectionObserver()
```

Locatie:
setupObserver()

# Data & API

## Fetch API

```js
fetch("https://swapi.py4e.com/api/people/")
```

Locatie:
getCharacters()

## JSON manipulatie

```js
const data = await res.json()
```

De opgehaalde data wordt gefilterd, gesorteerd en weergegeven in de applicatie.

# Opslag & Validatie

## LocalStorage

```js
localStorage.setItem()
```

```js
localStorage.getItem()
```

Locatie:
saveFavorites()

## Form validatie

Bij de zoekfunctie moet de gebruiker minimum 2 letters typen.

```js
if (value.length === 1)
```

# Styling & Layout

## CSS

De applicatie gebruikt:

- Flexbox
- Responsive design
- Hover effecten
- Buttons
- Modal popup
- Card animaties

## Gebruiksvriendelijke elementen

- Favorite knoppen
- Modal popup
- Hover effecten
- Smooth animations

# Project structuur

Het project is opgezet met Vite.

Structuur:

```bash
src/
  main.js
  style.css

public/
```

# Installatiehandleiding

## Stap 1

Clone de repository:

```bash
git clone https://github.com/RanyaRanya1/starwars-explorer-v3.git
```

## Stap 2

Open de map:

```bash
cd starwars-explorer-v3
```

## Stap 3

Installeer dependencies:

```bash
npm install
```

## Stap 4

Start de applicatie:

```bash
npm run dev
```

# Screenshots van de applicatie



# Gebruikte bronnen

## Websites

- https://swapi.py4e.com/
- https://developer.mozilla.org/
- https://vitejs.dev/
- https://javascript.info/

---

# AI-log

## Tool

ChatGPT

## Gebruik van AI

AI werd gebruikt als ondersteuning tijdens het ontwikkelen van de applicatie.

AI hielp bij:

- uitleg van JavaScript concepten
- debugging
- verbeteren van code structuur
- uitleg van LocalStorage
- uitleg van fetch en async/await
- hulp bij README structuur

## Voorbeelden van prompts

- "Hoe maak ik een filter functie in JavaScript?"
- "Hoe gebruik ik fetch met async await?"
- "Hoe maak ik een modal popup?"
- "Hoe werkt LocalStorage?"
- "Hoe gebruik ik IntersectionObserver?"

## Eigen werk

- applicatie zelf opgebouwd
- styling aangepast
- functionaliteiten getest
- code aangepast en verbeterd
- README aangevuld

---

# Auteur

Ranya
Web Advanced Project
