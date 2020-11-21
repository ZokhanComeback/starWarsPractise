const subscriber = require('../events/events');

class Store {
  static films = [];
  static characters = [];

  static getHtmlFromMovies = (movies) => {
    return movies
      .map(m => `<option value="${m.episode_id}">${m.title}</option>`)
      .join('');
  };

  static getHtmlFromHeroes = (heroes) => {
    return heroes
      .map(h => `<li class="sw-heroes__item">${h}</li>`)
      .join('');
  };

  static loadCharacters = (persons, id) => {
    const current = Store.characters.find(c => c.id === id);

    if (
      !current
    ) {
      Store.characters.push({
        id,
        persons
      });
    }
  }

  static onMoviesLoaded = (callback) => {
    subscriber.emitter.on(subscriber.events.moviesLoaded, callback);
  }
}

module.exports = Store;
