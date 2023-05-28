import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import compiler from '@ampproject/rollup-plugin-closure-compiler'
import { default as importHTTP } from 'import-http/rollup.js'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';

const dev = {
  input: 'app/js/index.ts',
  output: {
    file: 'app/bundle.js',
    format: 'esm',
    sourcemap: 'inline',
    plugins: [getBabelOutputPlugin({
      presets: [
        ["@babel/env", { "modules": false }]
      ]
    })],
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    nodePolyfills(),
    importHTTP(),
    typescript(),
    postcss({
      inject: false,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  }
}

const prod = {
  input: 'app/js/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
    plugins: [getBabelOutputPlugin({
      presets: [
        ["@babel/env", { "modules": false }]
      ]
    })],
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    nodePolyfills(),
    importHTTP(),
    typescript(),
    postcss({
      extract: true,
      minimize: { preset: 'default' },
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    compiler(),
    terser({
      ecma: 2015, // ES6
      mangle: { toplevel: true },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: true,
        drop_debugger: true,
      },
      output: { comments: false },
    }),
  ]
}

export default process.env.NODE_ENV === 'production'
  ? prod
  : dev

