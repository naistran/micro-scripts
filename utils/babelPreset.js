
module.exports = function preset() {
  return {
    presets: [
      [require.resolve('babel-preset-env'), {
        targets: {
          node: 'current',
        },
      }],
      require.resolve('babel-preset-stage-1'),
      require.resolve('babel-preset-react'),
    ],
  };
};
