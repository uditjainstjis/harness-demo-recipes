'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { withServer } = require('./helpers');

test('home page lists recipes', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /Recipe Box/);
    assert.match(html, /Pancakes/);
  }));

test('recipe page shows servings and ingredients', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/recipes/pancakes`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /Serves 4/);
    assert.match(html, /200 g flour/);
  }));

test('search finds recipes by title', () =>
  withServer(async (base) => {
    const html = await (await fetch(`${base}/search?q=bread`)).text();
    assert.match(html, /Banana Bread/);
    assert.match(html, /Simple White Bread/);
  }));

test('shopping list names the selected recipes', () =>
  withServer(async (base) => {
    const html = await (await fetch(`${base}/shopping?r=pancakes,greek-salad`)).text();
    assert.match(html, /For: Pancakes, Greek Salad/);
    assert.match(html, /200 g feta/);
  }));

test('API returns every recipe as JSON', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/api/recipes`);
    assert.equal(res.headers.get('content-type'), 'application/json');
    const recipes = await res.json();
    assert.equal(recipes.length, 11);
    assert.ok(recipes.every((recipe) => typeof recipe.totalTime === 'number'));
  }));

test('unknown pages are 404', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/nope`);
    assert.equal(res.status, 404);
  }));
