
module.exports = function preset() {
  return {
    presets: [
      [require.resolve('babel-preset-env'), {
        targets: {
          node: 'current',
        },
        whitelist: [
           'transform-es2015-destructuring', // whitelist and pin transform-object-rest-spread
           'transform-es2015-parameters',    // because of this https://github.com/babel/babel/issues/4904
         ],
      }],
      require.resolve('babel-preset-stage-1'),
      require.resolve('babel-preset-react'),
    ],
  };
};
