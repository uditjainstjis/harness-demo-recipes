'use strict';

const recipes = require('../data/recipes.json');

function getAll() {
  return recipes.slice();
}

function findBySlug(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}

function totalTime(recipe) {
  return recipe.prep + recipe.cook;
}

/** Recipes whose title contains the query (case-insensitive). */
function search(query) {
  const q = query.trim().toLowerCase();
  return recipes.filter((recipe) => recipe.title.toLowerCase().includes(q));
}

/** Sort by "title" (default) or "time" (total time). Returns a new array. */
function sortRecipes(list, key = 'title') {
  const value = (recipe) => (key === 'time' ? totalTime(recipe) : recipe.title);
  return list.slice().sort((a, b) => String(value(a)).localeCompare(String(value(b))));
}

module.exports = { getAll, findBySlug, totalTime, search, sortRecipes };
