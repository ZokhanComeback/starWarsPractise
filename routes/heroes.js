const express = require('express');
const router = express.Router();
const axios = require('axios');
const subscriber = require('../events/events');
const Store = require('../model/Store');

router.get('/:movieId', function(req, res, next) {
  const getCharacters = async (callback) => {
    const heroes = [];
    const films = await axios.get('https://swapi.dev/api/films/');
    let links = films.data.results.find(f => +f.episode_id === +req.params.movieId);
    let title = '';

    if (
      links
    ) {
      title = links.title;
      links = links.characters;
    }

    for (const l of links) {
      const link = await axios.get(l);
      heroes.push(link.data.name);
    }

    return {
      films: Store.getHtmlFromMovies(films.data.results),
      heroes: Store.getHtmlFromHeroes(heroes),
      title
    };
  }

  const render = async (films, heroes) => {
    const options = await getCharacters();
    res.render('heroes', options);
  }

  render();
});

module.exports = router;
