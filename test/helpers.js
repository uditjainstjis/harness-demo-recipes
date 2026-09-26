'use strict';

const { createServer } = require('../server');

/** Start the app on a random port, run `fn(baseUrl)`, then stop the server. */
async function withServer(fn) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    return await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

module.exports = { withServer };
