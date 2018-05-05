var paint = {};
paint.colors = ["black", "blue", "red", "green", "pink", "purple",];
paint.features = ["Smaller-Pen", "Bigger-Pen", "Smaller-eraser", "Bigger-eraser", "clear"]
var color = "black";
var size = 10;
var number = 0;

//determine the width of the canvas according to the user input//
var width = prompt("how long do you wish your canvas will be ? (between 100px to 1100px)");
if (isNaN(width) || width < 100 || width > 1100) {
    alert("you choose a wrong input, by default it will be a 500*500px canvas.")
    width = 500;
}

paint.start = function () {
    paint.layOut();
    paint.generateDynamicFeatures();
    paint.drawing();
}
// basic layout of the html //
paint.layOut = function () {
    var left = document.createElement("div");
    left.classList.add("buttonsArea");
    left.id = "buttonsFeat";
    document.body.appendChild(left);

    var canvas = document.createElement("div");
    canvas.classList.add("canvasArea");
    canvas.id = "canvasMouse";
    canvas.style.width = width + "px";
    document.body.appendChild(canvas);

    var bottom = document.createElement("div");
    bottom.id = "colorsArea";
    bottom.classList.add("bottomArea");
    document.body.appendChild(bottom);
}
//generate buttons //
paint.generateDynamicFeatures = function () {
    var leftButton = document.getElementById("buttonsFeat");
    for (var i = 0; i < paint.features.length; i++) {
        var buttonItem = document.createElement("li");
        var newButton = document.createElement("button");
        var buttonLabel = document.createTextNode(paint.features[i]);
        newButton.id = "featuresButton" + i;
        buttonItem.id = paint.features[i];
        buttonItem.appendChild(newButton);
        newButton.appendChild(buttonLabel);
        leftButton.appendChild(buttonItem);

        //determine which button have been clicked and affect change to the size of (pen , eraser) or colors//
        newButton.addEventListener("click", () => {
            var x = event.target;
            if (x.id == "featuresButton0" && size >= 10) {
                size = size - 5;
            } else if (x.id == "featuresButton1" && size < 40) {
                size = size + 5;
            } else if (x.id == "featuresButton2" && size >= 10) {
                size = size - 5;

            } else if (x.id == "featuresButton3" && size < 40) {
                size = size + 5;

            } else if (x.id == "featuresButton4") {
                for (var i = 0; i < number; i++) {
                    var canvas = document.getElementById("canvasMouse");
                    var flex = document.getElementById('colorDiv' + i);
                    canvas.removeChild(flex);
                }
                number = 0;
            }
        })
    }

    var text = document.createElement("p");
    text.innerHTML = "The eraser is use with the right click";
    buttonItem.appendChild(text);


    // generate colors buttons, that gonna change at every click the background color to the new div create into the canvas //
    var pallette = document.getElementById("colorsArea");
    for (var i = 0; i < paint.colors.length; i++) {
        var buttonColor = document.createElement("div");
        buttonColor.className = "color-btn";
        buttonColor.style.backgroundColor = paint.colors[i];
        pallette.appendChild(buttonColor);
        buttonColor.addEventListener("click", (event) => {
            color = event.target.style.backgroundColor;

        })
    }
}

paint.drawing = function () {
    var canvas = document.getElementById("canvasMouse");
    //create new div with background color into the "canvas"// 
    canvas.addEventListener("mousemove", (event) => {
        if (event.buttons === 1) {
            var x = event.clientX;
            var y = event.clientY;
            var newDiv = document.createElement("div");
            newDiv.id = "colorDiv" + number;
            newDiv.style.left = (x - 280) + "px";
            newDiv.style.top = (y - 32) + "px";
            newDiv.style.position = "absolute";
            newDiv.style.backgroundColor = color;
            newDiv.style.width = size + "px";
            newDiv.style.height = size + "px";
            canvas.appendChild(newDiv)
            number++;

            //make right click as eraser //
        } else if (event.buttons == 2) {
            var x = event.clientX;
            var y = event.clientY;
            var newDiv = document.createElement("div");
            newDiv.id = "colorDiv" + number;
            newDiv.style.left = (x - 280) + "px";
            newDiv.style.top = (y - 32) + "px";
            newDiv.style.position = "absolute";
            newDiv.style.backgroundColor = "white";
            newDiv.style.width = size + "px";
            newDiv.style.height = size + "px";
            canvas.appendChild(newDiv)
            number++;
        }
    })
}

paint.start();
