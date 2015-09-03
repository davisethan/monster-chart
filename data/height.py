import urllib2
from bs4 import BeautifulSoup

def main():
    fileName = "height.csv"
    file = open(fileName, "w")
    scrapeHeight(file)
    file.close()

def scrapeHeight(file):
    pokemonPageName = "http://pokedream.com/pokedex"
    pokemonPage = urllib2.urlopen(pokemonPageName)
    pokemonSoup = BeautifulSoup(pokemonPage)
    pokemonCell = pokemonSoup.findAll(name = "a")

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
        
        height = str(height).replace("\'", " ft. ").replace("\"", " in. ")
        row = pokemon + ", " + height + "\n"
        file.write(row)

main()