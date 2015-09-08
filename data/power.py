import urllib2, os
from bs4 import BeautifulSoup

def main():
    print "Calculating JSON power object..."

    path = "data"
    if not os.path.exists(path):
        os.makedirs(path)

    fileName = "power.json"
    file = open(os.path.join(path, fileName), "w")
    scrapePower(file)
    file.close()

def scrapePower(file):
    pageName = "http://pokedream.com/pokedex"
    page = urllib2.urlopen(pageName)
    soup = BeautifulSoup(page)
    pokemonCell = soup.findAll(name = "a")
    powerCell = soup.findAll(name = "td")

    objStr = "{"
    for i in range(42, 193):
        pokemon = pokemonCell[i].contents[1]
        power = powerCell[11 + 12 * (i - 42)].contents[0]
        row = '"' + pokemon + '":"' + power + '",'
        objStr += row

    objStr = objStr[:len(objStr) - 1] + "}"
    file.write(objStr)
    print "\tDone"

main()
