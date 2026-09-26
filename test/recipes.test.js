'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { getAll, findBySlug, search, sortRecipes, totalTime } = require('../src/recipes');

test('finds a recipe by slug', () => {
  assert.equal(findBySlug('pancakes').title, 'Pancakes');
  assert.equal(findBySlug('missing'), undefined);
});

test('search ignores case', () => {
  assert.deepEqual(search('PANCAKES').map((recipe) => recipe.title), ['Pancakes']);
});

test('sorts by title by default', () => {
  const titles = sortRecipes(getAll()).map((recipe) => recipe.title);
  assert.deepEqual(titles, [...titles].sort((a, b) => a.localeCompare(b)));
});

test('total time adds prep and cook time', () => {
  assert.equal(totalTime(findBySlug('pancakes')), 25);
});
