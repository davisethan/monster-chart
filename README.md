# PokemonChart
View generation I pokemon stats

***

### Installation requirements
- Docker
- Docker Compose

***

### Profiling

*Download PokemonChart from github and enter repository*

- `$ git clone git@github.com:ecdavis15/PokemonChart.git`
- `$ cd PokemonChart`

*Start docker and boot docker containers*

- `eval $(docker-machine env default)`
- `docker-compose up`

*Find docker-machine IP address (example: 10.211.55.4)*

- `docker-machine ip default`

*Visit [http://10.211.55.4:3000](http://10.211.55.4:3000) to view generation I pokemon stats*
