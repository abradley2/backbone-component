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
