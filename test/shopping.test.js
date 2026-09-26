'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { buildShoppingList } = require('../src/shopping');

const recipe = (...ingredients) => ({ ingredients });

test('adds up the same ingredient across recipes', () => {
  const list = buildShoppingList([
    recipe({ name: 'eggs', qty: 2, unit: '' }),
    recipe({ name: 'eggs', qty: 3, unit: '' }),
  ]);
  assert.deepEqual(list, [{ name: 'eggs', qty: 5, unit: '' }]);
});

test('adds up quantities in the same unit', () => {
  const list = buildShoppingList([
    recipe({ name: 'flour', qty: 200, unit: 'g' }),
    recipe({ name: 'flour', qty: 100, unit: 'g' }),
  ]);
  assert.deepEqual(list, [{ name: 'flour', qty: 300, unit: 'g' }]);
});

test('lists ingredients alphabetically', () => {
  const list = buildShoppingList([
    recipe({ name: 'sugar', qty: 1, unit: 'tbsp' }, { name: 'butter', qty: 30, unit: 'g' }),
  ]);
  assert.deepEqual(list.map((item) => item.name), ['butter', 'sugar']);
});
