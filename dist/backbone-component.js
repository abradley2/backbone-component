(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.backboneComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var fn = require('./fn.js');

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

},{"./fn.js":2}],2:[function(require,module,exports){
exports.mapObject = function(obj, callback, ctx){
  return Object.keys(obj).map( function(key){
    return callback.call( (ctx ? ctx : this), obj[key], key);
  });
};

exports.getAttributes = function(node){
  var retVal = {};
  for (var i = 0; i < node.attributes.length; i++){
    retVal[ node.attributes[i].name ] = node.attributes[i].value;
  }
  return retVal;
};

},{}]},{},[1])(1)
});