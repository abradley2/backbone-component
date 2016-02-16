require('../lib/backbone-component.js');

var MainView = require('./views/MainView.js');

var sut = new MainView({
  el: document.querySelector('body')
});

sut.render();
