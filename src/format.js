'use strict';

/** Human-friendly duration, e.g. 45 -> "45 min". */
function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  if (minutesLeft === 0) return `${hours} h`;
  return `${hours} h ${minutesLeft} min`;
}

function formatQuantity(qty) {
  return String(qty);
}

module.exports = { formatDuration, formatQuantity };
