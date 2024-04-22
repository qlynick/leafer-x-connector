import { IWatch, IWatchFunctionParams } from "./Interfaces";



type IQnConnectorProxy = (target:any, property:any, newValue:any,receiver:any) => boolean

export const QnConnectorProxy:IQnConnectorProxy = (target, property, newValue,receiver) => {
  // 检查是否有这个属性的监听函数
  const before = target[property];
  if (property in watcher && newValue !== before) {
    const params: IWatchFunctionParams = {val:newValue,before,target,receiver}
    const after = watcher[property].call(target,params);
    // 可以根据需要决定是否使用after的值作为新值
    target[property] = after;
    target._draw()
  } else {
    // 如果没有监听函数，直接设置属性值
    target[property] = newValue;
  }
  return true; // 表示成功设置了属性
}

// 监听参数
const watcher:IWatch = {
  'padding':({val})=>val,
  'margin':({val})=>val,
  'addPoint':({val})=>val,
  'type':({val})=>val,
}
