const { resolve } = require('path');
const spawn = require('cross-spawn');

let [,, source, target] = process.argv;

source = resolve(process.cwd(), source || 'src');
target = resolve(process.cwd(), target || 'dist');

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
  'cp',
  [
    resolve(process.cwd(), 'package.json'),
    target + '/',
  ],
  { stdio: 'inherit' }
);

spawn.sync(
  'cp',
  [
    resolve(process.cwd(), 'README.md'),
    target + '/',
  ],
  { stdio: 'inherit' }
);

spawn.sync(
  require.resolve('../node_modules/.bin/flow-copy-source'),
  [
    '-v',
    source,
    target,
  ],
  { stdio: 'inherit' }
);
