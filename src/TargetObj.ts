import { IBoundsType,IPointData } from "@leafer/interface"
import { IConnectorPoint, ConnectorTarget, IBoundsData, IConnectorOption, ITarget, ITargetOption } from "./Interfaces"
import { ExRect } from "./Rect" 
import { ExStandard } from "./Standard" 
import { Bounds } from "@leafer-ui/core"
import { IArrowType } from '@leafer-ui/interface';


export class TargetObj implements ITarget {
  padding?: number
  margin?: number
  target: ConnectorTarget
  linkPoint: IPointData

  // 暂时不需要,后续UI编辑里可能用到
  connPoints: IPointData[]  //所有可连接的点
  
  validPoints: IConnectorPoint[]  //有效连接的点
  boundType: IBoundsType
  arrowType:IArrowType

  // 初始化
  constructor(target: ConnectorTarget,opt:IConnectorOption,tOpt:ITargetOption){
    this.target = target
    var instance: ExRect | ExStandard
    // var instance: ExRect | ExStandard 
    switch (target.tag) {
      case 'Rect':
        // return new TargetObj(t)
        instance = new ExRect(target, opt, tOpt)
        break
      case 'Ellipse':
        instance = new ExStandard(target, opt, tOpt)
      // case 'Polygon':
      //   this.targetType = new ExStandard()
      // case 'Star':
      //   this.targetType = new ExStandard()
      default:
        instance = new ExStandard(target,opt,tOpt)
        break
    }
    this.padding = instance.padding || 8
    this.margin = instance.margin || 0
    this.boundType = instance.boundType
    this.arrowType = instance.arrowType
    this.connPoints = instance.getConnectionPoints()

    this.getBounds = instance.getBounds
    this.updateConnPoints= ():IPointData[] =>{
      this.connPoints = instance.getConnectionPoints()
      return this.connPoints
    }
    
    this.updateValidPoints= (targetObj:TargetObj):IConnectorPoint[] =>{
      var bound = targetObj.target.getLayoutBounds(targetObj.boundType,'local')
      var space = this.padding + this.margin
      var spreadBound = new Bounds(bound).spread(space)
      this.validPoints = instance.getValidPoints({
        width:spreadBound.width,
        height:spreadBound.height,
        x:spreadBound.x,
        y:spreadBound.y,
        rotation:bound.rotation, 
        scaleX:bound.scaleX, 
        scaleY:bound.scaleY, 
        skewX:bound.skewX, 
        skewY:bound.skewY
      })
      return this.validPoints
    }
  }
  /**
  * 获取边界线
  */ 
  getBounds: (spread?:number)=>IBoundsData  

  /**
  * 获取所有可连接的点
  */ 
  updateConnPoints:()=>IPointData[]

  /**
  * 获取有效可连接的点
  */ 
  updateValidPoints:(bound:TargetObj)=>IConnectorPoint[]
} 
