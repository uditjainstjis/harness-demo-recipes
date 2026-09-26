'use strict';

/** URL slug for a title, e.g. "Banana Bread" -> "banana-bread". */
function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

module.exports = { slugify };
