module.exports = Backbone.View.extend({
  template: require('./MainView.html'),

  components: {
    'like-button': require('../components/like-button.js')
  },

  initialize: function(params){
    this.model = new Backbone.Model(
      counter: 0
    );

    this.model.on('change:counter', this.render.bind(this));
  },

  render: function(){
    this.$el.html(
      Mustache.render(this.template, this.model.toJSON())
    );
    this.mountComponents();
  },

  remove: function(){
    this.unmountComponents();
    this.$el.empty();
  }
});
