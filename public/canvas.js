let isPenDown = false;
let undoArr = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top
    ctx.moveTo(x, y);
    console.log("Mouse down")
    isPenDown = true;
    // mouse down
    let mdp = {
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    undoArr.push(mdp);
    socket.emit("md",mdp);
})
// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move")
        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();
        // mouse move
        let mmp = {
            x,
            y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(mmp);
        socket.emit("mm",mmp);
    }
})
window.addEventListener("mouseup", function () {
    // close Path
    console.log("Mouse up")
    // ctx.closePath();
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function undoLast() {
    if (undoArr.length >=2) {
        //  lines 
        console.log(undoArr);
        let tempArr=[];
        for(let i=undoArr.length-1;i>=0;i--){
            console.log(undoArr[i]);
            let id=undoArr[i].id;
            if(id=="md"){
                tempArr.unshift(undoArr.pop());
                break;
            }
            else{
                tempArr.unshift(undoArr.pop());
            }
        }
        redoArr.push(tempArr);
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
}
function redoLast(){
    if(redoArr.length>0){
        let undoPath=redoArr.pop();
        for(let i=0;i<undoPath.length;i++){
            undoArr.push(undoPath[i]);
        }
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
}

function redraw() {
    for (let i = 0; i < undoArr.length; i++) {
        let { x, y, id, color, width } = undoArr[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y)
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}
//for download search canvas download.png