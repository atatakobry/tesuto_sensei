const rewireCssModules = require('react-app-rewire-css-modules');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = rewireCssModules(config, env);
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  );
  return config;
};
