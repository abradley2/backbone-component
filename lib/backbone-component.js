var fn = require('./fn.js'),
    jQuery = require('jquery'),
    $ = jQuery,
    Backbone = require('backbone');

Backbone.View.prototype._mountComponent = function(Component, element, node){
  if (! $(node).data(element) ) {
    var comp = new Component( fn.getAttributes(node), this);
    $(node).data(element, comp);
    comp.setElement(node);
    comp.render();
  }
  return $(node).data(element);
};

Backbone.View.prototype._unmountComponent = function(name, node){
  if ( $(node).data(name) ){
    $(node).data(name).remove();
    $(node).data(name, null);
  }
  return $(node);
};

Backbone.View.prototype.mountComponents = function(node){
  if (!node) node = this.$el;
  return fn.mapObject(this.components, function(Component, element){
    return node.find(element).map( (function(idx, node){
      return this._mountComponent(Component, element, node);
    }).bind(this));
  }, this);
};

Backbone.View.prototype.unmountComponents = function(node){
  if (!node) node = this.$el;
  return fn.mapObject(this.components, this._unmountComponent);
};
