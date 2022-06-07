import { isObject } from "@vue/shared";
import {
  reactiveHandler,
  shallowReactiveHandler,
  readonlyHandler,
  shallowReadonlyHandler,
} from "./baseHandler";

const reactiveMap = new WeakMap(); //会自动垃圾回收 不会造成内存泄漏 存储的key只能是对象
const readonlyMap = new WeakMap();

export function reactive(target: any) {
  return createReactiveObject(target, false, reactiveHandler);
}

export function shallowReactive(target: any) {
  return createReactiveObject(target, false, shallowReactiveHandler);
}

export function readonly(target: any) {
  return createReactiveObject(target, true, readonlyHandler);
}

export function shallowReadonly(target: any) {
  return createReactiveObject(target, true, shallowReadonlyHandler);
}

// 抽离出来的 是不是仅读 是不是深度 共性
// 考察设计模式了 （柯里化）
  
// 核心是利用proxy 拦截数据的读取和数据的修改
export function createReactiveObject(
  target: Object,
  isReadonly: boolean,
  baseHandler: Object
) {
  //如果目标不是对象 就没法拦截了
  let isObj = isObject(target);
  if (!isObj) return target;
  // 如果某个对象已经被代理了 就不要再次被代理了 可能一个对象被代理是深度 又被仅读代理
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existProxy = proxyMap.get(target);
  if (existProxy) return existProxy;
  const proxy = new Proxy(target, baseHandler);
  proxyMap.set(target, proxy);
  return proxy;
}
