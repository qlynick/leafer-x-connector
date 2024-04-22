# leafer-x-connector
![Preview](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/preview.gif)

| 字段    | 类型               | 默认 | 说明      |
| --------- | -------------------- | ------ | ----------- |
| *rect1  | Rect               |      | 连接对象1 |
| *rect2  | Rect               |      | 连接对象2 |
| *option | IQnConnectorOption |      | 连接属性  |


### 名称示意图

![sketch map](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image1.png)

#### IQnConnectorOption 属性

| 字段      | 类型                                                                                                      | 默认 | 说明                               |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------ |
| padding   | number                                                                                                    | 8    | 连接面延伸距离                     |
| margin    | number                                                                                                    | 0    | 对象和连线之间的空隙               |
| opt1      | ITargetOption                                                                                             | 8    | 单独设置连接面1的延伸距离          |
| opt2      | ITargetOption                                                                                             |      |                                    |
| addPoint  | IPointData[]                                                                                              |      | 连线自定义点                       |
| type      | IConnectorType                                                                                            |      | 连线类型，目前暂时只支持最简单类型 |
| boundType | IBoundsType                                                                                               |      |                                    |
| onDraw    | FOnDrowCallback = (param:{<br />  s:IConnectorPoint,<br />  e:IConnectorPoint,<br />  path:string<br />})\=\>string | <br />   | 自定义连线回调函数                 |


### 【Rect类型】ITargetOption 属性

| 字段    | 类型       | 默认 | 说明                                          |
| --------- | ------------ | ------ | ----------------------------------------------- |
| padding | number     | 8    | 连接面延伸距离                                |
| margin  | number     | 0    | 对象和连线之间的空隙                          |
| side    | ISideType  |      | 连接面1，连线与对象1的接触面<br />`top`, `bottom`, `left`, `right` 首字母<br /> |
| percent | ISideType  |      | 连接面2，连线与对象2的接触面                  |
| arrow   | IArrowType |      | 箭头类型参考官网箭头类型                      |

#### 后续开发计划: （~~已完成~~）

* [ ] 添加自定义链接点

  ![IPointData](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image2.png)
* [ ] 连线类型样式（`~~default~~`，`straight`，`curve`）

  ![IConnectorType](https://github.com/qlynick/leafer-x-connector/blob/main/playground/assets/image3.png)
* [X] 箭头自定义
* [ ] 多边形
* [ ] PNG透明图片
* [ ] 对象之间围绕碰撞检测（自定义连接点的时候有点问题）

### 示例1

```js
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { QnConnector } from "leafer-x-connector";
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
const conn = new QnConnector(elipse,rect) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)
```

### 示例2

```js
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { QnConnector } from "leafer-x-connector";
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
const conn = new QnConnector(elipse,rect) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)
```