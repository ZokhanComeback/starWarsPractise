const Emitter = require("events");
const emitter = new Emitter();

const events = Object.freeze({
  moviesLoaded: 'moviesLoaded',
  charactersLoaded: 'charactersLoaded'
});

const subscriber = {
  emitter,
  events
};

module.exports = subscriber;
