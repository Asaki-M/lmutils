import babel from '@rollup/plugin-babel'
export default {
  input: 'main.js',
  output: [
    {
      file: './lib/index.esm.js',
      format: 'esm', // 将软件包保存为 ES 模块文件
      name: 'index.esm'
    },
    {
      file: './lib/index.cjs.js',
      format: 'cjs', // CommonJS，适用于 Node 和 Browserify/Webpack
      name: 'index.cjs',
      exports: 'default'
    }
  ],
  watch: {
    // 配置监听处理
    exclude: 'node_modules/**'
  },

  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
}
