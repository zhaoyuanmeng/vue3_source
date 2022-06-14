// rollup的配置 可以用es6 这里

import path from "path";

// 引入插件
import json from "@rollup/plugin-json";

// 与位置有关的插件
import resolvePlus from "@rollup/plugin-node-resolve";

import ts from "rollup-plugin-typescript2";

// 根据环境变量中的Target属性 获取对应模块中的package.json

// 表示去当前目录下找packages  E:\vue3_source\packages
const packagesDir = path.resolve(__dirname, "packages");

// E:\vue3_source\packages\reactivity 打包的基准目录
const packageDir = path.resolve(packagesDir, process.env.Target);

const resolve = (p) => path.resolve(packageDir, p);

// 拿到配置信息
let pckJson = require(resolve("package.json"));

// reactivity
const name = path.basename(packageDir);

// 对打包类型 先做一个映射表 根据你提供的fromats做格式化需要打包的内容
const config = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife", //立即执行函数
  },
};

// package.json定义的
const options = pckJson.buildOptions;
// options: { name: 'VueShared', formats: [ 'cjs', 'esm-bundler' ] }

// 打包逻辑
function toRollup(format, config) {
  config.name = options.name;
  config.sourcemap = true;
  // 生成rollup配置
  return {
    input: resolve(`src/index.ts`),
    output: config,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      resolvePlus(),
    ],
  };
}
console.log("rollup--config");
// rollup 最终需要导出
export default options.formats.map((format) => {
  // 去打包
  return toRollup(format, config[format]);
});
