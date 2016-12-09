const { resolve } = require('path');
const parse = require('minimist');
const micro = require('micro');

module.exports = function run(cmd) {
  require('dotenv').config({ silent: true });

  const args = parse(process.argv, {
    alias: {
      H: 'host',
      p: 'port',
    },
    default: {
      H: '0.0.0.0',
      p: 3000,
    }
  });
  let [,, file] = args._;

  if (!file) {
    try {
      const packageJson = require(resolve(process.cwd(), 'package.json'));
      file = packageJson.main || cmd === 'dev' ? 'src/index.js' : 'index.js';
    } catch (err) {
      if ('MODULE_NOT_FOUND' !== err.code) {
        console.error(`micro-scripts: Could not read \`package.json\`: ${err.message}`);
        process.exit(1);
      }
    }
  }

  if (!file) {
    console.error('micro-scripts: Please supply a file.');
  }

  if ('/' !== file[0]) {
    file = resolve(process.cwd(), file);
  }

  let srv;

  try {
    srv = require(file);
    if (srv && 'object' === typeof srv) {
      srv = srv.default;
    }
  } catch (err) {
    console.error(`micro: Error when importing ${file}: ${err.stack}`);
    process.exit(1);
  }

  const { host, port } = args;

  if ('function' === typeof srv) {
    srv = micro(srv);
  }

  if (!srv.listen) {
    console.error(`micro-scripts: ${file} must export a function or an http.Server.`);
    process.exit(1);
  }

  srv.listen(port, host, err => {
    if (err) {
      console.error('micro-scripts:', err.stack);
      process.exit(1);
    }
    console.log(`Listening on http://${host}:${port}`);
  });
};
