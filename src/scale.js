'use strict';

/** Scale ingredient quantities from one number of servings to another. */
function scaleIngredients(ingredients, fromServings, toServings) {
  const factor = toServings / fromServings;
  return ingredients.map((ingredient) => ({ ...ingredient, qty: Math.round(ingredient.qty * factor * 100) / 100 }));
}

module.exports = { scaleIngredients };
