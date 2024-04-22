import { Ellipse, Rect, Polygon, Star } from "@leafer-ui/core"
import { IPointData,IBoundsType,ILayoutBoundsData } from '@leafer/interface/types'
import { IArrowType } from '@leafer-ui/interface';

export type IConnectorPoint = {
  linkPoint:IPointData,
  padding:IPointData,
  margin?:IPointData,
  pathPoint?:IPointData,
  anglePoint:IPointData,  //padding为零的时候为了计算角度的用途的点, 
  angle?:number,  //linkPoint,padding,linkPint2的角度, 
  side:ISideType
}


/**
 * @padding 延伸距离.
 * @side 接线面, 默认为自动计算.
 */
export interface IConnectorOption {
  padding?: number    
  margin?: number    
  opt1?:ITargetOption
  opt2?:ITargetOption
  addPoint?:IPointData[]
  type?:IConnectorType
  etc?:any
  boundType?:IBoundsType
  onDraw?:FOnDrowCallback
}

export interface ITargetPlugin {
  target:ConnectorTarget;

  /**
  * 根据对象类型,获取对象连接点
  */ 
  getBounds:() => IBoundsData
  getConnectionPoints:()=>IPointData[]
  getValidPoints:(bound:ILayoutBoundsData)=>IConnectorPoint[]
}

export interface ITarget{
  // targetType?:ConnectorTargetType
  padding?: number
  side?: ISideType  // top, bottom, left, right 首字母
  _autoSide?:ISideType
  point?:IPointData[]     // 自定义连接点(手动固定)
  percent?:number  // 自定义连接点的百分比(对象大小动态变化时根据百分比自动计算)
  boundType?:IBoundsType
  arrowType?:IArrowType
  // getConnectorPoint:()=>IConnectorPoint
  getBounds:()=>IBoundsData
}
export interface ITargetOption {
  padding?: number
  margin?: number
  side?: ISideType  // top, bottom, left, right 首字母
  linkPoint?:IPointData     // 自定义连接点(手动固定)
  percent?:number  // 自定义连接点的百分比(对象大小动态变化时根据百分比自动计算)
  boundType?:IBoundsType
  arrow?:IArrowType 
}


export type ConnectorTarget = Rect|Ellipse|Polygon|Star
// export type ConnectorTargetType = ExRect|ExStandard

export interface ILinePoints {
  s1:IPointData,
  e1:IPointData,
  s2:IPointData,
  e2:IPointData,
  a1:number,
  a2:number,
  addPoints:IPointData[]
}
export interface IBoundsData {
  t:IPointData,
  b:IPointData,
  l:IPointData,
  r:IPointData,
  bounds:ILayoutBoundsData,
}

export interface IWatchFunctionParams {
  val?: any; // 可以根据需要调整类型
  before?: any;
  target?: any;
  receiver?: any;
}

/**
 * 监控类型, 根据返回的值赋值
 * @key:string
 * @handler:function(params: IWatchFunctionParams) => any 
 * 
 * 示例: 'props':({val, oriVal, target, receiver})=>val
 */
export interface IWatch {
  [key: string|symbol]: (params: IWatchFunctionParams) => any 
}


/**
 * default:默认(最简单的), straight:直线, curve:弯曲
 * (可以使用首字母简写)
 */
export type IConnectorType = 
  'default' |         
  'straight' | 's' |  
  'curve' | 'c'       

/**
 * top, bottom, left, right 首字母
 */
export type ISideType = 't' | 'b' | 'l' | 'r'

/**
 * top, bottom, left, right 首字母. 空为重叠状态
 */
export type IDirection = 't' | 'b' | 'l' | 'r' | 'tr' | 'tl' | 'br' | 'bl' | ''





export type FGetRectPoint = (r:Rect, side: ISideType, percent?: number) => IPointData 

export type FOnDrowCallback = (param:{
  s:IConnectorPoint,
  e:IConnectorPoint,
  path:string
})=>string
