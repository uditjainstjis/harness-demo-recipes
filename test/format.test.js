'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { formatDuration, formatQuantity } = require('../src/format');

test('formats durations under an hour in minutes', () => {
  assert.equal(formatDuration(45), '45 min');
  assert.equal(formatDuration(5), '5 min');
});

test('formats whole quantities without decimals', () => {
  assert.equal(formatQuantity(2), '2');
  assert.equal(formatQuantity(200), '200');
});
