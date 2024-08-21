noseX = 0;
noseY = 0;
noseXnew = 0;
noseYnew = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;
color = document.getElementById("color").value;

function setup() {
    canvas = createCanvas(500, 450);
    canvas.position(700, 190);
    video = createCapture(VIDEO);
    video.size(550, 500);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background('#969A97')
    console.log(color);
    if (color != " ") {
        console.log(color);
        fill("red");
        stroke("red");
        square(noseXnew, noseYnew, difference);
        document.getElementById("square_side").innerHTML = "Width and height of the square will be " + difference + "px"; 
    }
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + "Nose Y = " + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        noseXnew = noseX - (difference/2);
        noseYnew = noseY - (difference/2);
        console.log("Nose X = " + noseXnew + "Nose Y = " + noseYnew);
        console.log("Left Wrist X = " + leftWristX + "Right Wrist X = " + rightWristX + "Difference = " + difference);
    }
}