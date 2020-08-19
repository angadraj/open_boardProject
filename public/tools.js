ctx.lineWidth=5;
ctx.lineWidth = 5;
ctx.lineCap="round";
ctx.lineJoin='round';
let activeTool = 'pencil';
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
function handleTool(tool) {
    if (tool == "pencil") {
        ctx.strokeStyle = "black";
        if (activeTool == "pencil") {
            pencilOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {
        ctx.strokeStyle = "white"
        if (activeTool == "eraser") {
            eraserOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            pencilOptions.classList.remove("show");
        }

    }
    else if(tool=="sticky"){
        console.log("sticky");
        createSticky();
    }
    else if(tool=="upload"){
        uploadFile();
    }
    else if(tool=="undo"){
        console.log("undo");
        undoLast();
    }
    else if(tool=="redo"){
        console.log('redo');
        redoLast();
    }
    else if(tool=='download'){
        console.log("downloaded");
        downloadBoard();
    }
}
function changeColor(color) {
    ctx.strokeStyle = color;
    socket.emit("colorChange",color);
    //send
}

let sliders = document.querySelectorAll("input[type='range']");
for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("change", function () {
        let width = sliders[i].value;
        ctx.lineWidth = width;
    })
} 
// socket.on("rColorChange",function(color){
//     ctx.strokeStyle=color;
// })