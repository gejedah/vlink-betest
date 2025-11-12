const ts = require('typescript');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      const { outputText } = ts.transpileModule(src, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2019,
          esModuleInterop: true,
        },
        fileName: path,
      });
      return outputText;
    }
    return src;
  },
};
