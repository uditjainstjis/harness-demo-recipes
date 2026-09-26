# Recipe Box

A tiny recipe website written in plain Node.js with no dependencies. Browse recipes, scale them to any number of servings, search, and build a combined shopping list.

## Run it

Requires Node.js 18 or newer.

```bash
npm start
```

Then open http://localhost:3000 (set `PORT` to use another port).

## Run the tests

```bash
npm test
```

The tests use Node's built-in test runner (`node --test`), so there is nothing to install.

## Pages

| URL | What it shows |
|---|---|
| `/` | All recipes (`?sort=title` or `?sort=time`) |
| `/recipes/<slug>` | One recipe; `?servings=N` scales the ingredients |
| `/search?q=...` | Search results |
| `/shopping?r=slug1,slug2` | Combined shopping list for several recipes |
| `/api/recipes` | All recipes as JSON (`?sort=` works here too) |

## Project layout

```
server.js           HTTP server and routes
src/recipes.js      Recipe data access, search and sorting
src/scale.js        Scaling ingredient quantities
src/shopping.js     Combining ingredients into a shopping list
src/format.js       Durations and quantities for display
src/html.js         HTML escaping and page layout
src/slug.js         URL slugs
data/recipes.json   The recipes
public/style.css    Styles
test/               node:test suite
```
