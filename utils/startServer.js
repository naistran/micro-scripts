require('babel-polyfill');

module.exports = function startServer(srv, { port, host }) {
  srv.listen(port, host, err => {
    if (err) {
      console.error('micro-scripts:', err.stack);
      process.exit(1);
    }
    console.log(`Listening on http://${host}:${port}`);
  });
};
