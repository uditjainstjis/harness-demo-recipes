'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { escapeHtml } = require('../src/html');
const { slugify } = require('../src/slug');

test('escapes a tag', () => {
  assert.equal(escapeHtml('<b>'), '&lt;b&gt;');
});

test('escapes an ampersand', () => {
  assert.equal(escapeHtml('Salt & pepper'), 'Salt &amp; pepper');
});

test('slugifies simple titles', () => {
  assert.equal(slugify('Banana Bread'), 'banana-bread');
  assert.equal(slugify('Slow Beef Stew'), 'slow-beef-stew');
});
