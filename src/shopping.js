'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 */
function buildShoppingList(recipes) {
  const items = new Map();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const key = ingredient.name.toLowerCase();
      if (items.has(key)) {
        items.get(key).qty += ingredient.qty;
      } else {
        items.set(key, { name: ingredient.name, qty: ingredient.qty, unit: ingredient.unit });
      }
    }
  }
  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
