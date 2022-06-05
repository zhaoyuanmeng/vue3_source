import { isObject } from "@vue/shared";
// 实现new proxy的get set

import { extend } from "@vue/shared";
import { reactive, readonly } from "./reactive";

// 考虑的点 仅读的没有set 是不是深度的 还有这个四个的get可能逻辑啥的都不一样 又是柯里化

const readOnlySet = {
  set: (target, key) => {
    console.warn(`设置${target}里面的${key}属性失败`);
  },
};

function createGetter(isReadonly: boolean = false, isShallow: boolean = false) {
  // receiver是proxy本身
  return function get(target, key, receiver) {
    // proxy + reflect(反射)
    const res = Reflect.get(target, key, receiver); //等价于target[key]

    if (!isReadonly) {
      // 收集依赖 等会数据变化的时候更新对应的视图
    }
    if (isShallow) {
      return res;
    }
    // vue2是一上来就递归没有条件 vue3是readonly为false的时候会进行代理 懒模式
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}

function createSetter(isShallow: boolean = false) {
  return function set(target, key, val, reveiver) {
    const res = Reflect.set(target, key, val, reveiver); //target[key] = val
    return res;
  };
}

const reactiveGet = createGetter();
const shallowReactiveGet = createGetter(false, true);
const readonlyGet = createGetter(true, false);
const shallowReadonlyGet = createGetter(true, true);

const reactiveSet = createSetter();
const shallowReactiveSet = createSetter(true);

export const reactiveHandler = {
  get: reactiveGet,
  set: reactiveSet,
};
export const shallowReactiveHandler = {
  get: shallowReactiveGet,
  set: shallowReactiveSet,
};
export const readonlyHandler = extend(
  {
    get: readonlyGet,
  },
  readOnlySet
);

export const shallowReadonlyHandler = extend(
  {
    get: shallowReadonlyGet,
  },
  readOnlySet
);
