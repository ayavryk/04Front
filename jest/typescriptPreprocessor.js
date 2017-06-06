const tsc = require('typescript');

const tsConfig = require('../tsconfig.json');

const compilerOptions = Object.assign({}, tsConfig.compilerOptions, {
  noEmitHelpers: false,
});

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx') || path.endsWith('.js')) {
      return tsc.transpile(src, compilerOptions, path, []);
    }
    return src;
  },
};
