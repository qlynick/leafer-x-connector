import { Leafer, Rect, Ellipse } from 'leafer-ui'
import { LeaferXQnConnector } from "./src/index";
// import { LeaferXQnConnector } from "leafer-x-connector";
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