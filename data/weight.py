import urllib2, os
from bs4 import BeautifulSoup

def main():
    print "Calculating JSON weight object..."

    path = "data"
    if not os.path.exists(path):
        os.makedirs(path)

    fileName = "weight.json"
    file = open(os.path.join(path, fileName), "w")
    scrapeWeight(file)
    file.close()

def scrapeWeight(file):
    pokemonPageName = "http://pokedream.com/pokedex"
    pokemonPage = urllib2.urlopen(pokemonPageName)
    pokemonSoup = BeautifulSoup(pokemonPage)
    pokemonCell = pokemonSoup.findAll(name = "a")

    objStr = "{"
    for i in range(42, 193):
        pokemon = pokemonCell[i].contents[1]
        weightPageName = "http://pokedream.com/pokedex/pokemon/" + pokemon
        weightPage = urllib2.urlopen(weightPageName)
        weightSoup = BeautifulSoup(weightPage)
        weightCell = weightSoup.findAll(name = "td")

        weight = weightCell[9].contents[0]
        if "kg" in weight:
            weight = weightCell[8].contents[0]
        if "Nidoran F" in pokemon:
            weight = weightCell[7].contents[0]
        if "Nidorina" in pokemon:
            weight = weightCell[7].contents[0]
        if "Nidoran M" in pokemon:
            weight = weightCell[7].contents[0]
        if "Nidorino" in pokemon:
            weight = weightCell[7].contents[0]
        if "Voltorb" in pokemon:
            weight = weightCell[7].contents[0]
        if "Electrode" in pokemon:
            weight = weightCell[7].contents[0]
        if "Hitmonlee" in pokemon:
            weight = weightCell[7].contents[0]
        if "Hitmonchan" in pokemon:
            weight = weightCell[7].contents[0]
        if "Chansey" in pokemon:
            weight = weightCell[7].contents[0]
        if "Kangaskhan" in pokemon:
            weight = weightCell[7].contents[0]
        if "Staryu" in pokemon:
            weight = weightCell[7].contents[0]
        if "Tauros" in pokemon:
            weight = weightCell[7].contents[0]
        if "Ditto" in pokemon:
            weight = weightCell[7].contents[0]
        if "Porygon" in pokemon:
            weight = weightCell[7].contents[0]
        if "Mewtwo" in pokemon:
            weight = weightCell[7].contents[0]
        if "Mew" in pokemon:
            weight = weightCell[7].contents[0]

        row = '"' + pokemon + '":"' + weight + '",'
        objStr += row

    objStr = objStr[:len(objStr) - 1] + "}"
    file.write(objStr)
    print "\tDone!"

main()
