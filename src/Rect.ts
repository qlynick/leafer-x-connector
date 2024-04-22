import { IBoundsType,IPointData,ILayoutBoundsData } from "@leafer/interface"
import {   IConnectorPoint, ConnectorTarget,IBoundsData, ITargetOption, ITargetPlugin, ISideType, IConnectorOption } from './Interfaces';
import { loadValue } from './util';
import { IArrowType } from '@leafer-ui/interface';
export class ExRect implements ITargetPlugin {
   
  target: ConnectorTarget
  side: ISideType
  _autoSide: ISideType
  percent: number
  padding: number
  margin: number
  arrowType:IArrowType
  boundType:IBoundsType
  validSide:ISideType[]
  constructor(target:ConnectorTarget,opt:IConnectorOption,tOpt:ITargetOption){
    this.padding = loadValue(tOpt?.padding, opt?.padding, 8)
    this.margin = loadValue(tOpt?.margin, opt?.margin, 0)
    this.side = tOpt?.side
    this._autoSide = 'b'
    this.boundType = opt?.boundType || 'stroke'
    this.arrowType = tOpt?.arrow || 'none'
    this.target = target
    this.percent = loadValue(tOpt?.percent, 0.5)
  }
  getConnectionPoints: () => IPointData[] = ()=>{
    let a:IPointData[] = []
    let bounds = this.getBounds(this.padding+this.margin)
    a.push(bounds.t,bounds.b,bounds.l,bounds.r)
    return a
  }
  getValidPoints: (bound:ILayoutBoundsData) => IConnectorPoint[] = (bound)=>{
    this.setValidSide(bound)
    let a:IConnectorPoint[] = []
    let bounds = this.getBounds(this.margin)
    let bounds2 = this.getBounds(this.padding+this.margin)
    if(this.side != undefined){
      a.push({
        'linkPoint':bounds[this.side],
        'padding':bounds2[this.side],
        'side':this.side,
        'anglePoint':bounds[this.side]
      })
      return a
    }
    for (const s of this.validSide) {
      let anglePoint = bounds[s]
      switch (s) {
        case 't':
          anglePoint.y = bounds[s].y + 1;
          break;
        case 'b':
          anglePoint.y = bounds[s].y - 1;
          break;
        case 'l':
          anglePoint.x = bounds[s].x + 1;
          break;
        case 'r':
          anglePoint.x = bounds[s].x - 1;
          break;
        default:
          break;
      }
      a.push({
        'linkPoint':bounds[s],
        'padding':bounds2[s],
        'side':s,
        'anglePoint':anglePoint
      })
    }
    // a.push(bounds.t,bounds.b,bounds.l,bounds.r)
    return a
  }

  checkInSide(p:IPointData,bound:ILayoutBoundsData):boolean {
    let x1 = bound.x
    let x2 = bound.x+bound.width
    let y1 = bound.y
    let y2 = bound.y+bound.height
    let isX = p.x >= x1 && p.x <= x2
    let isY = p.y >= y1 && p.y <= y2

    return !(isX && isY)
  }

  // 根据属性,获取有效连接点
  setValidSide(bound:ILayoutBoundsData):void{ 
    let myBound = this.getBounds(this.padding+this.margin)
    let obj:ISideType[] = []
    this.checkInSide(myBound.t,bound) && obj.push('t')
    this.checkInSide(myBound.b,bound) && obj.push('b')
    this.checkInSide(myBound.l,bound) && obj.push('l')
    this.checkInSide(myBound.r,bound) && obj.push('r')
    this.validSide = obj
  }
  
  getBounds: (spread?:number) => IBoundsData = (spread)=>{
    const bounds = this.target.getLayoutBounds(this.boundType,'local')
    const { width, height,x,y } = bounds
    let percent = this.percent || 0.5
    spread = spread || 0
    bounds.x = x - spread
    bounds.y = y - spread
    bounds.width = width + spread*2
    bounds.height = height + spread*2

    let t:IPointData = {
      x: x + percent * width,
      y: y - spread,
    }

    let b:IPointData = {
      x : x + (1-percent) * width,
      y : y + height + spread,
    }
  

    let l:IPointData = {
      x : x - spread,
      y : y + (1-percent) * height,
    }
  
    
    let r:IPointData = {
      x : x + width + spread,
      y : y + percent * height,
    }
    return {t,b,l,r,bounds}
  } 

  // getConnectorPoint: () => IConnectorPoint = ()=>{
  //   const bounds = this.target.getLayoutBounds(this.boundType,'local')
  //   let point: IPointData = {x: 0, y: 0};
  //   let anglePoint: IPointData = {x: 0, y: 0};
  //   let p2: IPointData = {x: 0, y: 0};
  //   const { width, height } = bounds; 
  //   let tempPadding = 8;  // Fix:为了padding为0的时候求不出角度的问题
  //   let percent = this.percent || 0.5
  //   let padding = this.padding + this.margin
  //   let side = loadValue(this.side, this._autoSide)
  //   switch (side) {
  //     case 't':
  //       point.x = bounds.x + percent * width;
  //       point.y = bounds.y - this.margin;
  //       p2.x = point.x;
  //       p2.y = point.y - padding;
  //       anglePoint.x = point.x;
  //       anglePoint.y = point.y + tempPadding;
  //       break;
  //     case 'b':
  //       point.x = bounds.x + (1-percent) * width;
  //       point.y = bounds.y + height + this.margin;
  //       p2.x = point.x;
  //       p2.y = point.y + padding;
  //       anglePoint.x = point.x;
  //       anglePoint.y = point.y - tempPadding;
  //       break;
  //     case 'l':
  //       point.x = bounds.x - this.margin;
  //       point.y = bounds.y + (1-percent) * height;
  //       p2.x = point.x - padding;
  //       p2.y = point.y;
  //       anglePoint.x = point.x + tempPadding;
  //       anglePoint.y = point.y;
  //       break;
  //     case 'r':
  //       point.x = bounds.x + width +  this.margin;
  //       point.y = bounds.y + percent * height;
  //       p2.x = point.x + padding;
  //       p2.y = point.y;
  //       anglePoint.x = point.x - tempPadding;
  //       anglePoint.y = point.y;
  //       break;
  //     default:
  //       throw new Error("Invalid side type");
  //   }
  //   return {
  //     linkPoint:point,
  //     padding: p2,
  //     anglePoint: anglePoint,
  //     side:side
  //   }; 
  // } 
}