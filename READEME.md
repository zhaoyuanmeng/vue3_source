## vue3 源码

## 安装的

1. typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json

2. execa

## 快速生成 tsconfig.json

npx tsc --init

## yarn install 背后做的事（于 yarn add 这是两种命令）

前提是 package.json 那里设置了 workspace 属性
把 workspace 项目下的所有包自动创建软链放到 node_moudle 里面
方便多个包互相引用

## sourcemap 文件是为了调试的 因为打包完那些模块的都被转义了 而 sourcemap 还是原来的代码可以调试

## Reflect 好处 后续 object 的方法会迁移到 Reflect 上，还有返回值
