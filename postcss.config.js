const customProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const calc = require('postcss-calc');
const atRulesVariables = require('postcss-at-rules-variables');
const cssImport = require('postcss-import');
const atFor = require('postcss-for');
const pixrem = require('pixrem');

const variables = require('./app/styles/variables');

module.exports = {
  plugins: [
    cssImport,
    mixins,
    customProperties({
      variables,
      strict: false,
    }),
    nested,
    atRulesVariables,
    atFor,
    calc,
    pixrem({
      rootValue: variables['font-size'],
      replace: true,
      browsers: ['last 100 versions'],
      html: false,
    }),
    autoprefixer({ browsers: ['last 100 versions'] }),
  ],
};
