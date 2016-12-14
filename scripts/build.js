const { resolve } = require('path');
const npmRun = require('npm-run');

const source = resolve(process.cwd(), 'src');
const target = resolve(process.cwd(), 'dist');

npmRun.spawnSync(
  'babel',
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

npmRun.spawnSync(
  'babel',
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

// npmRun.spawnSync(
//   'cp',
//   [
//     resolve(process.cwd(), 'package.json'),
//     target + '/',
//   ],
//   { stdio: 'inherit' }
// );
//
// npmRun.spawnSync(
//   'cp',
//   [
//     resolve(process.cwd(), 'README.md'),
//     target + '/',
//   ],
//   { stdio: 'inherit' }
// );
//
// npmRun.spawnSync(
//   require.resolve('../node_modules/.bin/flow-copy-source'),
//   [
//     '-v',
//     source,
//     target,
//   ],
//   { stdio: 'inherit' }
// );
