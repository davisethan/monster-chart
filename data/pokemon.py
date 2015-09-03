import urllib2
from bs4 import BeautifulSoup

def main():
    fileName = "pokemon.csv"
    file = open(fileName, "w")
    scrapePokemon(file)
    file.close()

def scrapePokemon(file):
    pokemonPageName = "http://pokedream.com/pokedex"
    picPageName = "http://pokedream.com/pokedex/images/sugimori/"
    page = urllib2.urlopen(pokemonPageName)
    soup = BeautifulSoup(page)
    pokemonNameCell = soup.findAll(name = "a")
    pokemonNumberCell = soup.findAll(name = "td")
    pokemon = []
    number = []
    
    for i in range(42, 193):
        pokemon.insert(len(pokemon), pokemonNameCell[i].contents[1])
    
    for i in range(0, 151):
        number.insert(len(pokemon), pokemonNumberCell[1 + 12 * i].contents[0])

    for i in range(0, 151):
        row = pokemon[i] + ", " + picPageName + number[i] + ".jpg\n"
        print(row)
        file.write(row)

main()