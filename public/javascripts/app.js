$(document).ready(function() {
  var pokedexCanvas = $('#pokedexCanvas')[0]
  var pokedexContext = pokedexCanvas.getContext('2d')
  var heightCanvas = $('#heightCanvas')[0]
  var heightContext = heightCanvas.getContext('2d')
  var weightCanvas = $('#weightCanvas')[0]
  var weightContext = weightCanvas.getContext('2d')
  var powerCanvas = $('#powerCanvas')[0]
  var powerContext = powerCanvas.getContext('2d')

  pokedexContext.rect(0, 0, pokedexCanvas.width, pokedexCanvas.height)
  pokedexContext.fillStyle = 'white'
  pokedexContext.fill()
  heightContext.rect(0, 0, heightCanvas.width, heightCanvas.height)
  heightContext.fillStyle = 'white'
  heightContext.fill()
  weightContext.rect(0, 0, weightCanvas.width, weightCanvas.height)
  weightContext.fillStyle = 'white'
  weightContext.fill()
  powerContext.rect(0, 0, powerCanvas.width, powerCanvas.height)
  powerContext.fillStyle = 'white'
  powerContext.fill()

  var pokedexArray = []
  var heightArray = []
  var weightArray = []
  var powerArray = []
  var oldHeight = 0

  var imagesList = pokemon.names
  imagesList.forEach(function(monster) {
    var newHeight = pokemonHeight(monster)
    drawImage(oldHeight, pokedexCanvas.height - newHeight, newHeight, newHeight, pokemon.images[monster], pokedexContext, monster, pokedexArray)
    oldHeight += newHeight
  })

  oldHeight = 0
  var heightList = orderPokemonByHeight()
  heightList.forEach(function(monster) {
    var newHeight = pokemonHeight(monster)
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.images[monster], heightContext, monster, heightArray)
    oldHeight += newHeight
  })

  oldHeight = 0
  var weightList = orderPokemonByWeight()
  weightList.forEach(function(monster) {
    var newHeight = pokemonHeight(monster)
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.images[monster], weightContext, monster, weightArray)
    oldHeight += newHeight
  })

  oldHeight = 0
  var powerList = orderPokemonByPower()
  powerList.forEach(function(monster) {
    var newHeight = pokemonHeight(monster)
    drawImage(oldHeight, heightCanvas.height - newHeight, newHeight, newHeight, pokemon.images[monster], powerContext, monster, powerArray)
    oldHeight += newHeight
  })

  $('#pokedexCanvas').click(function(event) {
    var clickedX = event.pageX - this.offsetLeft
    var clickedY = event.pageY - this.offsetTop

    pokedexArray.forEach(function(monster, index) {
      if (clickedX < pokedexArray[index].right && clickedX > pokedexArray[index].left && clickedY > pokedexArray[index].top && clickedY < pokedexArray[index].bottom)
        alertBox(pokedexArray[index].name, event)
    })
  })

  $('#heightCanvas').click(function(event) {
    var clickedX = event.pageX - this.offsetLeft
    var clickedY = event.pageY - this.offsetTop

    heightArray.forEach(function(monster, index) {
      if (clickedX < heightArray[index].right && clickedX > heightArray[index].left && clickedY > heightArray[index].top && clickedY < heightArray[index].bottom)
        alertBox(heightArray[index].name, event)
    })
  })

  $('#weightCanvas').click(function(event) {
    var clickedX = event.pageX - this.offsetLeft
    var clickedY = event.pageY - this.offsetTop

    weightArray.forEach(function(monster, index) {
      if (clickedX < weightArray[index].right && clickedX > weightArray[index].left && clickedY > weightArray[index].top && clickedY < weightArray[index].bottom)
        alertBox(weightArray[index].name, event)
    })
  })

  $('#powerCanvas').click(function(event) {
    var clickedX = event.pageX - this.offsetLeft
    var clickedY = event.pageY - this.offsetTop

    powerArray.forEach(function(monster, index) {
      if (clickedX < powerArray[index].right && clickedX > powerArray[index].left && clickedY > powerArray[index].top && clickedY < powerArray[index].bottom)
        alertBox(powerArray[index].name, event)
    })
  })

  function alertBox(monster, event) {
    $('#dialog').dialog({
      title: monster,
      position: {
        my: 'left+50 bottom-50',
        of: event
      }
    })
    $('#dialog').html('Height: ' + pokemon.heights[monster] + '<br>Weight: ' + pokemon.weights[monster] + '<br>Power: ' + pokemon.powers[monster])
  }
})

function drawImage(x, y, width, height, source, context, monster, monsterArray) {
  monsterArray.push({
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
    name: monster
  })
  var image = new Image()
  image.src = source
  image.onload = function() {
    context.drawImage(image, x, y, width, height)
  }
}

function pokemonHeight(monster) {
  var height = pokemon.heights[monster]
  var feet = Number(height.substring(0, height.indexOf('ft') - 1))
  var inch = Number(height.substring(height.indexOf('.') + 2, height.indexOf('in') - 1))
  var newHeight = 20 * (feet + inch / 12)
  return newHeight
}

function pokemonWeight(monster) {
  var weight = pokemon.weights[monster]
  var newWeight = Number(weight.substring(0, weight.indexOf('lb') - 1))
  return newWeight
}

function pokemonPower(monster) {
  return pokemon.powers[monster]
}

function orderPokemonByHeight() {
  var list = []
  Object.keys(pokemon.heights).forEach(function(monster) {
    insertionSort(monster, 0, list.length - 1, list, pokemonHeight)
  })
  return list
}

function orderPokemonByWeight() {
  var list = []
  Object.keys(pokemon.weights).forEach(function(monster) {
    insertionSort(monster, 0, list.length - 1, list, pokemonWeight)
  })
  return list
}

function orderPokemonByPower() {
  var list = []
  Object.keys(pokemon.powers).forEach(function(monster) {
    insertionSort(monster, 0, list.length - 1, list, pokemonPower)
  })
  return list
}

function insertionSort(item, min, max, list, action) {
  if (max < min) {
    list.splice(max + 1, 0, item)
    return list
  }

  var center = Math.floor((max + min) / 2)
  if (action(item) > action(list[center])) {
    return insertionSort(item, center + 1, max, list, action)
  } else if (action(item) < action(list[center])) {
    return insertionSort(item, min, center - 1, list, action)
  } else {
    list.splice(center + 1, 0, item)
    return list
  }
}