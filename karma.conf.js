module.exports = function(config) {
  config.set({
    frameworks: ['browserify','mocha'],
    files: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/underscore/underscore.js',
      './node_modules/backbone/backbone.js',
      './node_modules/mustache/mustache.js',
      './test/main.js'
    ],
    preprocessors: {
      'test/main.js': [ 'browserify' ]
    },
    browserify: {
      transform: ['stringify']
    },
    browsers: ['Chrome']
  });
};
