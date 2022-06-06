/*
 *@Author: 赵元达
 *@Date: 2022-06-06 10:30:42
 *@parms:
 *@Description:
 */

export function effect(fn: any, options: any = {}) {
  // 我需要让这个effect变成响应的effect，可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    //默认的effect会执行
    effect(); //响应式的effect会默认先执行一次
  }
  return effect;
}

// 做一个effect标识
let uid = 0;
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    console.log("to do...");
  };
  effect.id = uid++; //用来区分effect
  effect._isEffect = true; //用于标识这个是响应式effect
  effect.raw = fn; //保留effect对应的原函数
  effect.options = options;
  return effect;
}
