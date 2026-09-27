'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 * Converts compatible units (g/kg to g, ml/l to ml) before adding.
 */
function buildShoppingList(recipes) {
  const weightConversion = { g: 1, kg: 1000 };
  const volumeConversion = { ml: 1, l: 1000 };
  const items = new Map();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      let convertedQty;
      let baseUnit;
      const unit = ingredient.unit;
      if (unit in weightConversion) {
        convertedQty = ingredient.qty * weightConversion[unit];
        baseUnit = 'g';
      } else if (unit in volumeConversion) {
        convertedQty = ingredient.qty * volumeConversion[unit];
        baseUnit = 'ml';
      } else {
        convertedQty = ingredient.qty;
        baseUnit = unit;
      }
      const key = `${ingredient.name.toLowerCase()}|${baseUnit}`;
      if (items.has(key)) {
        items.get(key).qty += convertedQty;
      } else {
        items.set(key, { name: ingredient.name, qty: convertedQty, unit: baseUnit });
      }
    }
  }
  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
