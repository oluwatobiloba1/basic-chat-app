import express from 'express';
import { Server } from "socket.io";
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)



const PATH = path.join(__dirname, 'public');

const app = express();
app.use(express.static(PATH));
const expressServer = app.listen(3000, () => {console.log('Server started on port 3000')});

const io = new Server(expressServer,{
    cors:{
        origin: '*',
    }
})


io.on('connection', (socket) => {
    //upon connection welcome the connected user
    socket.emit('message',`Welcome to the chat ${socket.id}`);


    //upon connection broadcast that the user has joined
    socket.broadcast.emit('message',`User-${socket.id.substring(0,7)} has joined the chat`); 

    socket.on('message',(data)=>{
        io.emit('message',`User-${socket.id.substring(0,7)}: ${data}`);
    })
    socket.on('activity',(data)=>{
        socket.broadcast.emit('activity',`user-${socket.id}`);
    })

    socket.on('disconnect',()=>{
        io.emit('message',`User-${socket.id.substring(0,7)} has left the chat`);
    })
});
