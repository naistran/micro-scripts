const { resolve } = require('path');
const spawn = require('cross-spawn');

const source = resolve(process.cwd(), 'src');
const target = resolve(process.cwd(), 'dist');

spawn.sync(
  require.resolve('../node_modules/.bin/babel'),
  [
    source,
    '--presets',
    require.resolve('../utils/babelPreset'),
    '--ignore',
    '__tests__',
    '--out-dir',
    target + '/',
  ],
  { stdio: 'inherit' }
);

spawn.sync(
  require.resolve('../node_modules/.bin/babel'),
  [
    resolve(__dirname, '..', 'utils/startServer.js'),
    '--presets',
    require.resolve('../utils/babelPreset'),
    '--ignore',
    '__tests__',
    '--out-file',
    resolve(target, 'startServer.js'),
  ],
  { stdio: 'inherit' }
);

// spawn.sync(
//   'cp',
//   [
//     resolve(process.cwd(), 'package.json'),
//     target + '/',
//   ],
//   { stdio: 'inherit' }
// );
//
// spawn.sync(
//   'cp',
//   [
//     resolve(process.cwd(), 'README.md'),
//     target + '/',
//   ],
//   { stdio: 'inherit' }
// );
//
// spawn.sync(
//   require.resolve('../node_modules/.bin/flow-copy-source'),
//   [
//     '-v',
//     source,
//     target,
//   ],
//   { stdio: 'inherit' }
// );
