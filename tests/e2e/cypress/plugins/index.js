const webpackPreprocessor = require('@cypress/webpack-preprocessor')
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../../../webpack.config'),
    watchOptions: {}
  }
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', webpackPreprocessor(options))
}
