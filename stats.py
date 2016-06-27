import urllib2, os, json
from bs4 import BeautifulSoup
from more_itertools import unique_everseen

def main():
	names = []
	types = ['Grass', 'Poison', 'Fire', 'Dragon', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Steel', 'Ice', 'Ghost', 'Dark']
	scrapeNames(names, types)

	pokemon = {
		'images': {},
		'heights': {},
		'weights': {},
		'powers': {},
		'names': []
	}

	scrapePowers(pokemon, names)
	scrapeHeightsWeights(pokemon, names)

	names = list(unique_everseen(names))
	pokemon['names'] = names

	scrapeImages(pokemon, names)

	fileName = 'stats.json'
	file = open(fileName, 'w')
	json.dump(pokemon, file, indent = 2)
	file.close()

def scrapeNames(names, types):
	print 'Scraping pokemon names...'
	pageName = 'http://pokemondb.net/pokedex/all'
	page = urllib2.urlopen(pageName)
	soup = BeautifulSoup(page)
	cell = soup.findAll(name = 'a')

	for i in range (75, 485):
		name = cell[i].contents[0].encode('utf-8')
		if name not in types:
			if '\xe2\x99\x82' in name:
				name = name.replace('\xe2\x99\x82', ' M ')

			if '\xe2\x99\x80' in name:
				name = name.replace('\xe2\x99\x80', ' F ')

			names.append(name.strip())

	print '\tDone!'

def scrapePowers(pokemon, names):
	print 'Scraping pokemon base stat power rankings...'
	pageName = 'http://pokemondb.net/pokedex/all'
	page = urllib2.urlopen(pageName)
	soup = BeautifulSoup(page)
	cell = soup.findAll(name = 'td')
	
	for i in range(0, 166):
		power = cell[3 + 10 * i].contents[0].encode('utf-8')
		if names[i] not in pokemon['powers'] or power < pokemon['powers'][names[i]]:
			pokemon['powers'][names[i]] = power

	print '\tDone!'

def scrapeHeightsWeights(pokemon, names):
	print 'Scraping pokemon heights and weights...'
	for name in names:
		pageName = 'http://pokemondb.net/pokedex/'
		if name == 'Nidoran F':
			pageName += 'nidoran-f'
		elif name == 'Nidoran M':
			pageName += 'nidoran-m'
		elif name == 'Farfetch\'d':
			pageName += 'farfetchd'
		elif name == 'Mr. Mime':
			pageName += 'mr-mime'
		else:
			pageName += name

		page = urllib2.urlopen(pageName)
		soup = BeautifulSoup(page)
		cell = soup.findAll(name = 'td')

		height = cell[3].contents[0].encode('utf-8')
		height = height[0:height.index(' ')].replace('\xe2\x80\xb2', ' ft. ').replace('\xe2\x80\xb3', ' in. ').strip()
		pokemon['heights'][name] = height

		weight = cell[4].contents[0].encode('utf-8')
		weight = (weight[0:weight.index(' ')] + ' lbs. ').strip()
		pokemon['weights'][name] = weight

	print '\tDone!'

def scrapeImages(pokemon, names):
	print 'Scraping pokemon images...'
	files = []
	for fileName in os.listdir('./public/images'):
		files.append('/images/' + fileName)

	for i in range(0, len(names)):
		pokemon['images'][names[i]] = files[i]

	print '\tDone!'

main()
