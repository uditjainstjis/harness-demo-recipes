'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { scaleIngredients } = require('../src/scale');

test('doubles quantities when doubling servings', () => {
  const scaled = scaleIngredients([{ name: 'eggs', qty: 2, unit: '' }], 4, 8);
  assert.deepEqual(scaled, [{ name: 'eggs', qty: 4, unit: '' }]);
});

test('does not modify the original ingredients', () => {
  const original = [{ name: 'flour', qty: 200, unit: 'g' }];
  scaleIngredients(original, 4, 8);
  assert.equal(original[0].qty, 200);
});
