const express = require('express');
const router = express.Router();
const axios = require('axios');
const subscriber = require('../events/events');
const Store = require('../model/Store');

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
      render(Store.getHtmlFromMovies(Store.films));
    });
  } else {
    render(Store.getHtmlFromMovies(Store.films));
  }
});

module.exports = router;
