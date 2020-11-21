const subscriber = require('../events/events');

class Store {
  static films = [];
  static characters = [];

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
