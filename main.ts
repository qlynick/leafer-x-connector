import { Leafer,Group, Rect, Ellipse } from 'leafer-ui'
import { LeaferXQnConnector,IConnectorOption } from "./src/index";
// import { QnConnector } from "leafer-x-connector";
const leafer = new Leafer({ view: window })
 

const elipse = new Ellipse({ 
    x: 150, 
    y: 150,  
    fill: '#32cd79',  
    draggable: true,
}) 
const rect = new Rect({ 
    x: 350,
    y: 250,
    fill: '#323379', 
    draggable: true,
    stroke: '#ccc',
    strokeWidth: 15,
}) 

const opt:IConnectorOption = {
    opt1:{
        // side:'t',
        arrow:'square',
        // margin:25,
    },
    opt2:{
        // side:'r',
        percent:0.8,
        arrow:'triangle',
        // margin:5,
    },
    padding:20,
    // margin:10,
    etc:{
        // text,
        leafer
    },
    onDraw:(param)=>{
        console.log(`param::`,param)
        return param.path
    }
}
const conn = new LeaferXQnConnector(elipse,rect,opt) 

const group = new Group({ 
    x: 100,
    y: 100
})

group.add(rect)
group.add(elipse)
// leafer.add(conn)
leafer.add(group)
group.add(conn)