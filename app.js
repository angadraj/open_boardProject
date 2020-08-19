const express=require("express");
const app=express();
// const path=require("path");
const httpServer=require("http").createServer(app);
const socketServer=require("socket.io")(httpServer);
app.use(express.static("public"));

socketServer.on("connection",function(socket){
    console.log("new client connected");
    console.log(socket.id);
    socket.on("colorChange",function(color){
        console.log(color);
        socket.broadcast.emit("rColorChange",color);
    }); 
    socket.on("md",function(point){
        console.log(point);
        socket.broadcast.emit("onmd",point);
    })
    socket.on("mm",function(point){
        console.log(point);
        socket.broadcast.emit("onmm",point);
    })
})
// app.get("/home",function(req,res){
//     res.sendFile(path.join(__dirname,"public/index.html"));
// })
//  tcp => uniquely identify server on a machine
let port =process.env.PORT||3000;
httpServer.listen(port,function(){
    console.log("server is listening to request at port",port);
})