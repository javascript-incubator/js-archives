/* eslint-disable */
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';

const name = `indra`;

const plugins = [
  babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
  nodeResolve({
    module: true,
    jsnext: true
  }),
  commonjs({
    include: `node_modules/**`,
    namedExports: {
      'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
      'node_modules/react-dom/index.js': ['render']
    }
  }),
  bundleSize()
];

const isProd = process.env.NODE_ENV === `production`;
// if(isProd) plugins.push(uglify());

export default {
  entry: `src/index.js`,
  plugins,
  targets: [{
      dest: `dist/${name}${isProd ? `.min` : ``}.js`,
      moduleName: name,
      format: `umd`
    },
    {
      dest: 'es/index.js',
      format: 'es',
      moduleName: name
    },
    {
      dest: 'cjs/index.js',
      format: 'cjs',
      moduleName: name
    }
  ]
}
