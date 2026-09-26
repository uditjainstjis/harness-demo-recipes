'use strict';

/** Human-friendly duration, e.g. 45 -> "45 min". */
function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  const rest = minutes % 60;
  return `${hours} h ${rest} min`;
}

function formatQuantity(qty) {
  return String(qty);
}

module.exports = { formatDuration, formatQuantity };
