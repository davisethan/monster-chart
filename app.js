var pokedexCanvas = $("#pokedexCanvas")[0];
var pokedexContext = pokedexCanvas.getContext("2d");
var heightCanvas = $("#heightCanvas")[0];
var heightContext = heightCanvas.getContext("2d");
var weightCanvas = $("#weightCanvas")[0];
var weightContext = weightCanvas.getContext("2d");
var powerCanvas = $("#powerCanvas")[0];
var powerContext = powerCanvas.getContext("2d");

pokedexContext.rect(0, 0, pokedexCanvas.width, pokedexCanvas.height);
pokedexContext.fillStyle = "white";
pokedexContext.fill();
heightContext.rect(0, 0, heightCanvas.width, heightCanvas.height);
heightContext.fillStyle = "white";
heightContext.fill();
weightContext.rect(0, 0, weightCanvas.width, weightCanvas.height);
weightContext.fillStyle = "white";
weightContext.fill();
powerContext.rect(0, 0, powerCanvas.width, powerCanvas.height);
powerContext.fillStyle = "white";
powerContext.fill();

var pokedexArray = [];
var heightArray = [];
var weightArray = [];
var powerArray = [];
var Monster = function(x, y, length, name) {
    this.left = x;
    this.top = y;
    this.right = x + length;
    this.bottom = y + length;
    this.name = name;
}

var oldHeight = 0;
for (var monster in pokemon.image) {
    var newHeight = pokemonHeight(monster);
    drawImage(oldHeight, pokedexCanvas.height - newHeight, newHeight, newHeight, pokemon.image[monster], pokedexContext, monster, pokedexArray);
    oldHeight += newHeight;
}

oldHeight = 0;
var heightList = orderPokemonByHeight();
for (var monster in heightList) {
    var newHeight = pokemonHeight(heightList[monster]);
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.image[heightList[monster]], heightContext, heightList[monster], heightArray);
    oldHeight += newHeight;
}

oldHeight = 0;
var weightList = orderPokemonByWeight();
for (var monster in weightList) {
    var newHeight = pokemonHeight(weightList[monster]);
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.image[weightList[monster]], weightContext, weightList[monster], weightArray);
    oldHeight += newHeight;
}

oldHeight = 0;
var powerList = orderPokemonByPower();
for (var monster in powerList) {
    var newHeight = pokemonHeight(powerList[monster]);
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.image[powerList[monster]], powerContext, powerList[monster], powerArray);
    oldHeight += newHeight;
}

$("#pokedexCanvas").click(function(event) {
    var clickedX = event.pageX - this.offsetLeft;
    var clickedY = event.pageY - this.offsetTop;

    for (var i = 0; i < pokedexArray.length; i++) {
        if (clickedX < pokedexArray[i].right && clickedX > pokedexArray[i].left &&
            clickedY > pokedexArray[i].top && clickedY < pokedexArray[i].bottom) {
            alertBox(pokedexArray[i].name);
        }
    }
});

$("#heightCanvas").click(function(event) {
    var clickedX = event.pageX - this.offsetLeft;
    var clickedY = event.pageY - this.offsetTop;

    for (var i = 0; i < heightArray.length; i++) {
        if (clickedX < heightArray[i].right && clickedX > heightArray[i].left &&
            clickedY > heightArray[i].top && clickedY < heightArray[i].bottom) {
            alertBox(heightArray[i].name);
        }
    }
});

$("#weightCanvas").click(function(event) {
    var clickedX = event.pageX - this.offsetLeft;
    var clickedY = event.pageY - this.offsetTop;

    for (var i = 0; i < weightArray.length; i++) {
        if (clickedX < weightArray[i].right && clickedX > weightArray[i].left &&
            clickedY > weightArray[i].top && clickedY < weightArray[i].bottom) {
            alertBox(weightArray[i].name);
        }
    }
});

$("#powerCanvas").click(function(event) {
    var clickedX = event.pageX - this.offsetLeft;
    var clickedY = event.pageY - this.offsetTop;

    for (var i = 0; i < powerArray.length; i++) {
        if (clickedX < powerArray[i].right && clickedX > powerArray[i].left &&
            clickedY > powerArray[i].top && clickedY < powerArray[i].bottom) {
            alertBox(powerArray[i].name);
        }
    }
});

function alertBox(monster) {
    $("#dialog").dialog();
    $("#dialog").dialog("option", "title", monster);
    $("#dialog").html("Height: "  + pokemon.height[monster] + "<br/>" +
                      "Weight: " + pokemon.weight[monster] + "<br/>" +
                      "Power: " + pokemon.power[monster]);
}

function drawImage(x, y, width, height, source, context, monster, monsterArray) {
    monsterArray.push(new Monster(x, y, width, monster));
    var image = new Image();
    image.src = source;
    image.onload = function() {
        context.drawImage(image, x, y, width, height);
    }
}

function orderPokemonByHeight() {
    var list = [];
    for (var monster in pokemon.height) {
        insertionSort(monster, 0, list.length - 1, list, pokemonHeight);
    }

    return list;
}

function orderPokemonByWeight() {
    var list = [];
    for (var monster in pokemon.weight) {
        insertionSort(monster, 0, list.length - 1, list, pokemonWeight);
    }

    return list;
}

function orderPokemonByPower() {
    var list = [];
    for (var monster in pokemon.power) {
        insertionSort(monster, 0, list.length - 1, list, pokemonPower);
    }

    return list;
}

function pokemonHeight(monster) {
    var height = pokemon.height[monster];
    var feet = Number(height.substring(0, height.indexOf("ft") - 1));
    var inch = Number(height.substring(height.indexOf(".") + 2, height.indexOf("in") - 1));
    var newHeight = 20 * (feet + inch / 12);
    return newHeight;
}

function pokemonWeight(monster) {
    var weight = pokemon.weight[monster];
    var newWeight = Number(weight.substring(0, weight.indexOf("lb") - 1));
    return newWeight;
}

function pokemonPower(monster) {
    return pokemon.power[monster];
}

function insertionSort(item, min, max, list, action) {
    if (max < min) {
        list.splice(max + 1, 0, item);
        return list;
    }

    var center = Math.floor((max + min) / 2);
    if (action(item) > action(list[center])) {
        return insertionSort(item, center + 1, max, list, action);
    }
    else if (action(item) < action(list[center])) {
        return insertionSort(item, min, center - 1, list, action);
    }
    else {
        list.splice(center + 1, 0, item);
        return list;
    }
}
