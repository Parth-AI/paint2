var points = [];
var database;
var position;

var currentPath = [];

function setup()
{
    database = firebase.database();
    console.log(database);

    var canvas = createCanvas(700,450);
    canvas.mousePressed(startPath);
   // canvas.mouseReleased(endPath);


    var pointsPosition = database.ref('Points');
    pointsPosition.on("value",readPosition,showError);
}

function startPath(){
    currentPath = [];
    points.push(currentPath);
}

function draw()
{
    background(0);

    

    stroke(255);
    strokeWeight(8);
    noFill();
    for(var i = 0;i<points.length;i++){
        var path = points[i];
        beginShape();
        for(var j = 0;j<path.length;j++){
        vertex(path[j].x,path[j].y);
    }
    endShape();
}
}

function mouseDragged(){
    var point = {
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

function keyPressed(){
    if(keyCode === 32){
        points = [];
    }
}

function readPosition(data){
    Points = data.val();
    Points.x = mouseX;
    Points.y = mouseY;
}

function showError(){
    console.log("error to writing in a database");
}
