module.exports = Backbone.View.extend({
  template: require('./like-button.html'),

  events: {
    '[data-action="likeThis"]': function(){
      this.model.set('message', 'I Like This');
    }
  },

  initialize: function(attributes, view){
    console.log('component attributes = ',attributes.liked);
    console.log(attributes.liked ? 'I Like This' : '');
    this.model = new Backbone.Model({
      message: (attributes.liked ? 'I Like This' : '')
    });

    this.model.on('change', this.render.bind(this));
  },

  render: function(){
    this.$el.html(
      Mustache.render(this.template, this.model.toJSON())
    );
  },

  remove: function(){
    this.model.off();
    this.$el.empty();
  }

});
