const Lectro = require('@lectro/node');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { spawnSync } = require('child_process');

const defaultOptions = { blacklist: ['react'] };

class SaveExternalsWebpackPlugin {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(
      'SaveExternalsWebpackPlugin',
      (stats, callback) => {
        const externals = stats.compilation.modules
          .filter(x => x.external)
          .map(x => x.request)
          .filter(x => !this.options.blacklist.includes(x));

        /* eslint-disable import/no-dynamic-require, global-require */
        const packageJson = require(path.resolve(
          this.options.moduleDirectory,
          'package.json',
        ));

        const versionedExternals = externals.map(
          x => `${x}@${packageJson.dependencies[x]}`,
        );

        spawnSync('yarn', ['add', ...versionedExternals], {
          env: process.env,
          stdio: 'inherit',
          cwd: process.cwd(),
        });
        callback();
      },
    );
  }
}

module.exports = ({ moduleDirectory, blacklist }) =>
  new Lectro()
    .resolveModules(path.resolve(moduleDirectory, 'node_modules'))
    .resolveLoader(path.resolve(__dirname, '../node_modules'))
    .extend(config => {
      config.externals = nodeExternals({
        modulesDir: path.resolve(moduleDirectory, 'node_modules'),
      });
      config.plugins.push(
        new SaveExternalsWebpackPlugin({
          moduleDirectory,
          blacklist,
        }),
      );
      return config;
    })
    .build();
