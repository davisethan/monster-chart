import urllib2, os
from bs4 import BeautifulSoup

def main():
    print "Calculating JSON height object..."

    path = "data"
    if not os.path.exists(path):
        os.makedirs(path)

    fileName = "height.json"
    file = open(os.path.join(path, fileName), "w")
    scrapeHeight(file)
    file.close()

def scrapeHeight(file):
    pokemonPageName = "http://pokedream.com/pokedex"
    pokemonPage = urllib2.urlopen(pokemonPageName)
    pokemonSoup = BeautifulSoup(pokemonPage)
    pokemonCell = pokemonSoup.findAll(name = "a")

    objStr = "{"
    for i in range(42, 193):
        pokemon = pokemonCell[i].contents[1]
        heightPageName = "http://pokedream.com/pokedex/pokemon/" + pokemon
        heightPage = urllib2.urlopen(heightPageName)
        heightSoup = BeautifulSoup(heightPage)
        heightCell = heightSoup.findAll(name = "td")

        height = heightCell[7].contents[0]
        if "m" in height:
            height = heightCell[6].contents[0]
        if "lb" in height:
            height = heightCell[5].contents[0]

        height = str(height).replace("\'", " ft. ").replace("\"", " in. ").strip()
        row = '"' + pokemon + '":"' + height + '",'
        objStr += row

    objStr = objStr[:len(objStr) - 1] + "}"
    file.write(objStr)
    print "\tDone"

main()
