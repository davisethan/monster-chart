# PokemonChart
View generation I pokemon stats

***

### Installation requirements
- Node.js
- NPM
- MongoDB

***

### Profiling

*Download PokemonChart from github and enter repository*

- `$ git clone git@github.com:ecdavis15/PokemonChart.git`
- `$ cd PokemonChart`

*Install NPM dependencies*

- `$ npm install`

*Generate pokemon stats*

- `$ python stats.py`

*Create, boot, and fill MongoDB database*

- `$ mkdir pokemondb`
- `$ mongod --dbpath pokemondb`
- `$ mongoimport --db stats --collection pokemon --file stats.json`

*Boot Node.js server*

- `$ npm start`

*Visit [http://localhost:3000](http://localhost:3000) to view generation I pokemon stats*