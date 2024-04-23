# leafer-x-connector
![Preview](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/preview.gif)

| 字段    | 类型               | 默认 | 说明      |
| --------- | -------------------- | ------ | ----------- |
| *rect1  | Rect               |      | 连接对象1 |
| *rect2  | Rect               |      | 连接对象2 |
| *option | IQnConnectorOption |      | 连接属性  |


#### IQnConnectorOption 属性

| 字段      | 类型                                                                                                      | 默认 | 说明                               |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------ |
| padding   | number                                                                                                    | 8    | 连接面延伸距离                     |
| margin    | number                                                                                                    | 0    | 对象和连线之间的空隙               |
| opt1      | ITargetOption                                                                                             |      | 单独设置连接面1的延伸距离          |
| opt2      | ITargetOption                                                                                             |      |                                    |
| addPoint  | IPointData[]                                                                                              |      | 连线自定义点                       |
| type      | IConnectorType                                                                                            |      | 连线类型，目前暂时只支持最简单类型 |
| boundType | IBoundsType                                                                                               |      |                                    |
| onDraw    | FOnDrowCallback = (param:{<br />  s:IConnectorPoint,<br />  e:IConnectorPoint,<br />  path:string<br />})\=\>string | <br />   | 自定义连线回调函数                 |


### 【Rect类型】ITargetOption 属性(后续根据不同形状参数略不同)

| 字段    | 类型       | 默认 | 说明                                          |
| --------- | ------------ | ------ | ----------------------------------------------- |
| padding | number     | 8    | 连接面延伸距离                                |
| margin  | number     | 0    | 对象和连线之间的空隙                          |
| side    | ISideType  |      | 指定连接面，连线与对象的接触面<br/>`top`, `bottom`, `left`, `right` 首字母 |
| percent | ISideType  |      | 指定连接面与连线的接触点（按顺时针方向）                  |
| arrow   | IArrowType |      | 箭头类型参考官网箭头类型                      |

#### 后续开发计划: （~~已完成~~）

* [ ] 添加自定义链接点

  ![IPointData](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image2.png)
* [ ] 连线类型样式（~~`default`~~，`straight`，`curve`）

  ![IConnectorType](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image3.png)
* [X] 箭头自定义
* [ ] 多边形
* [ ] PNG透明图片
* [ ] 对象之间围绕碰撞检测（自定义连接点的时候有点问题）

### 示例1: 快速上手

```js
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { LeaferXQnConnector } from "leafer-x-connector";
const leafer = new Leafer({ view: window })
 

const elipse = new Ellipse({ 
    x: 150, 
    y: 150,  
    fill: '#32cd79',  
    draggable: true,
}) 
const rect = new Rect({ 
    x: 350,
    y: 220,
    fill: '#323379', 
    draggable: true,
}) 
const conn = new LeaferXQnConnector(elipse,rect) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)
```

### 示例2: 属性配置

```js
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { LeaferXQnConnector } from "leafer-x-connector";
const leafer = new Leafer({ view: window })
 

const elipse = new Ellipse({ 
    x: 150, 
    y: 150,  
    fill: '#32cd79',  
    draggable: true,
}) 
const rect = new Rect({ 
    x: 350,
    y: 220,
    fill: '#323379', 
    draggable: true,
}) 

const opt:IConnectorOption = {
    opt1:{
        margin:25,    // 比外层优先级更高
    },
    opt2:{
        percent:0.8,
        margin:5,
    },
    padding:20,
    margin:10,
}

const conn = new LeaferXQnConnector(elipse,rect,opt) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)
```


### 示例3: 回调, 自定义连线

![sketch map](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image1.png)

```js
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { LeaferXQnConnector } from "leafer-x-connector";
const leafer = new Leafer({ view: window })
 

const elipse = new Ellipse({ 
    x: 150, 
    y: 150,  
    fill: '#32cd79',  
    draggable: true,
}) 
const rect = new Rect({ 
    x: 350,
    y: 220,
    fill: '#323379', 
    draggable: true,
}) 
const opt:IConnectorOption = {
    onDraw:(param)=>{
        console.log(`param::`,param)
        
        // 根据需求可自定义path即可
        return param.path   
    }
}
const conn = new LeaferXQnConnector(elipse,rect,opt) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)

/* 回调输出:
param::{
  "s": {
    "linkPoint": {
      "x": 236.12890625,
      "y": 387.453125
    },
    "padding": {
      "x": 236.12890625,
      "y": 367.453125
    },
    "side": "t",
    "anglePoint": {   // padding为零的时候为了计算角度使用的点
      "x": 236.12890625,
      "y": 387.453125
    },
    "angle": 261.0890177921008
  },
  "e": {
    "linkPoint": {
      "x": 455,
      "y": 330
    },
    "padding": {
      "x": 475,
      "y": 330
    },
    "side": "r",
    "anglePoint": {
      "x": 455,
      "y": 330
    },
    "angle": 351.0890177921008,
    "pathPoint": {
      "x": 475,
      "y": 367.453125
    }
  },
  "path": "M 236.12890625 387.453125 L 236.12890625 367.453125 L 475 367.453125 L 475 330 L 455 330"
}
```