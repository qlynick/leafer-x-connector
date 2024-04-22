import { Leafer, Rect, Ellipse } from 'leafer-ui'
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
}) 

const opt:IConnectorOption = {
    opt1:{
        side:'t',
        arrow:'square',
        margin:25,
    },
    opt2:{
        side:'r',
        percent:0.8,
        arrow:'triangle',
        margin:5,
    },
    padding:20,
    margin:10,
    etc:{
        // text,
        leafer
    },
    onDraw:(param)=>{
        // console.log(`param::`,param)
        return param.path
    }
}
const conn = new LeaferXQnConnector(elipse,rect,opt) 

leafer.add(rect)
leafer.add(elipse)
leafer.add(conn)