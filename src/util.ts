import { IPointData } from '@leafer/interface/types'

 
export function calcAngle(A: IPointData, B: IPointData, C: IPointData):number {

    // 计算向量BA和BC
    let BA = { x: B.x - A.x, y: B.y - A.y };
    let BC = { x: B.x - C.x, y: B.y - C.y };

    // 计算向量的点乘，以确定角度的大小
    let dotProduct = BA.x * BC.x + BA.y * BC.y;

    // 计算向量的模，以便用于余弦定理计算
    let magnitudeBA = Math.sqrt(BA.x * BA.x + BA.y * BA.y);
    let magnitudeBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);

    // 使用余弦定理计算角度
    let angle = Math.acos(dotProduct / (magnitudeBA * magnitudeBC)) * (180 / Math.PI);

    // 计算向量的叉乘，以确定角度的方向
    let crossProduct = BA.x * BC.y - BA.y * BC.x;

    // 如果叉乘为负，角度应该在顺时针方向，我们需要从360减去角度值
    if (crossProduct < 0) {
        angle = 360 - angle;
    }

    return angle;
} 

// 求两点距离
export function calcDistance(a:IPointData,b:IPointData){
    const x1 = a.x;
    const y1 = a.y;
    const x2 = b.x;
    const y2 = b.y;
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
    return distance;
}

export function loadValue(...args: any[]): any {
    return args.find(arg => arg !== undefined);
}