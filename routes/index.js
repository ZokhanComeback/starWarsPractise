const express = require('express');
const router = express.Router();
const axios = require('axios');
const subscriber = require('../events/events');
const Store = require('../model/Store');

const getHtmlFromMovies = (movies) => {
  return movies
    .map(m => `<option value="${m.episode_id}">${m.title}</option>`)
    .join('');
};

const getHtmlFromHeroes = (heroes) => {
  return heroes
    .map(h => `<li class="sw-heroes__item">${h}</li>`)
    .join('');
};

router.get('/', function(req, res, next) {
  const getFilms = () => {
    axios.get('https://swapi.dev/api/films/')
      .then(result => {
        const movies = result.data.results;
        subscriber.emitter.emit(subscriber.events.moviesLoaded, movies);
      });
  }

  const render = (html) => {
    res.render('index', {films: html});
  }

  if (
    !Store.films.length
  ) {
    getFilms();

    Store.onMoviesLoaded((movies) => {
      Store.films = [...movies];
      render(getHtmlFromMovies(Store.films));
    });
  } else {
    render(getHtmlFromMovies(Store.films));
  }
});

router.get('/:movieId', function(req, res, next) {
  const getCharacters = async () => {
    const result = [];
    const films = await axios.get('https://swapi.dev/api/films/');
    const links = films.data.results.find(f => +f.episode_id === +req.params.movieId).characters;

    for (const l of links) {
      const link = await axios.get(l);
      result.push(link.data.name);
    }

    return result;
  }

  const render = async () => {
    const heroes = await getCharacters();
    res.render('heroes', {heroes: getHtmlFromHeroes(heroes)});
  }

  render();
});

module.exports = router;
