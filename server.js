'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const { getAll, findBySlug, search, sortRecipes, totalTime } = require('./src/recipes');
const { scaleIngredients } = require('./src/scale');
const { buildShoppingList } = require('./src/shopping');
const { formatDuration, formatQuantity } = require('./src/format');
const { escapeHtml, layout } = require('./src/html');
const { slugify } = require('./src/slug');

const STYLESHEET = fs.readFileSync(path.join(__dirname, 'public', 'style.css'));

function send(res, status, body, contentType = 'text/html; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(body);
}

function ingredientLine(ingredient) {
  const unit = ingredient.unit ? ` ${escapeHtml(ingredient.unit)}` : '';
  return `<li>${formatQuantity(ingredient.qty)}${unit} ${escapeHtml(ingredient.name)}</li>`;
}

function recipeList(recipes) {
  if (recipes.length === 0) return '<p>No recipes found.</p>';
  const items = recipes.map(
    (recipe) => `<li class="recipe">
      <a class="recipe-title" href="/recipes/${slugify(recipe.title)}">${escapeHtml(recipe.title)}</a>
      <span class="time">${formatDuration(totalTime(recipe))}</span>
      <span class="tags">${recipe.tags.map(escapeHtml).join(', ')}</span>
    </li>`
  );
  return `<ul class="recipes">\n${items.join('\n')}\n</ul>`;
}

function homePage(params) {
  const recipes = sortRecipes(getAll(), params.get('sort') || 'title');
  return layout(
    'All recipes',
    `<h1>All recipes</h1>
    <nav class="sort">Sort by: <a href="/?sort=title">Title</a> · <a href="/?sort=time">Total time</a></nav>
    ${recipeList(recipes)}`
  );
}

function recipePage(recipe, params) {
  let servings = recipe.servings;
  const servingsParam = params.get('servings');
  if (servingsParam !== null && servingsParam !== '') {
    const num = Number(servingsParam);
    if (!isNaN(num) && Number.isInteger(num) && num >= 1 && num <= 50) {
      servings = num;
    }
  }
  const ingredients = scaleIngredients(recipe.ingredients, recipe.servings, servings);
  const steps = recipe.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('\n');
  return layout(
    recipe.title,
    `<article class="recipe-detail">
    <h1>${escapeHtml(recipe.title)}</h1>
    <p class="meta">Serves ${servings} · Prep ${formatDuration(recipe.prep)} · Cook ${formatDuration(recipe.cook)} · Total ${formatDuration(totalTime(recipe))}</p>
    <form method="get"><label>Servings <input name="servings" value="${servings}" size="3"></label> <button>Scale</button></form>
    <h2>Ingredients</h2>
    <ul class="ingredients">\n${ingredients.map(ingredientLine).join('\n')}\n</ul>
    <h2>Method</h2>
    <ol class="steps">\n${steps}\n</ol>
  </article>`
  );
}

function searchPage(params) {
  const query = params.get('q') || '';
  const results = query ? search(query) : [];
  return layout('Search', `<h1>Results for "${escapeHtml(query)}"</h1>\n${recipeList(results)}`);
}

function shoppingPage(params) {
  const slugs = (params.get('r') || '').split(',').filter(Boolean);
  const recipes = slugs.map(findBySlug).filter(Boolean);
  const names = recipes.map((recipe) => escapeHtml(recipe.title)).join(', ') || 'no recipes selected';
  return layout(
    'Shopping list',
    `<h1>Shopping list</h1>
    <p>For: ${names}</p>
    <ul class="shopping">\n${buildShoppingList(recipes).map(ingredientLine).join('\n')}\n</ul>`
  );
}

function apiRecipes(params) {
  return sortRecipes(getAll(), params.get('sort') || 'title').map((recipe) => ({
    slug: recipe.slug,
    title: recipe.title,
    tags: recipe.tags,
    servings: recipe.servings,
    totalTime: totalTime(recipe),
  }));
}

function handle(req, res) {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost');
  if (req.method !== 'GET') return send(res, 405, 'Method Not Allowed', 'text/plain');
  if (pathname === '/') return send(res, 200, homePage(searchParams));
  if (pathname === '/search') return send(res, 200, searchPage(searchParams));
  if (pathname === '/shopping') return send(res, 200, shoppingPage(searchParams));
  if (pathname === '/api/recipes') return send(res, 200, JSON.stringify(apiRecipes(searchParams)), 'application/json');
  if (pathname === '/style.css') return send(res, 200, STYLESHEET, 'text/css');

  const match = pathname.match(/^\/recipes\/([^/]+)$/);
  if (match) {
    const recipe = findBySlug(decodeURIComponent(match[1]));
    return send(res, 200, recipePage(recipe, searchParams));
  }
  return send(res, 404, layout('Not found', '<h1>Page not found</h1>'));
}

function createServer() {
  return http.createServer((req, res) => {
    try {
      handle(req, res);
    } catch (err) {
      console.error(err);
      send(res, 500, 'Internal Server Error', 'text/plain');
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Recipe Box running at http://localhost:${port}`);
  });
}

module.exports = { createServer };
