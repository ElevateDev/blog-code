Items = new Mongo.Collection('items');

Items.search = function(searchTerm, options){
  options = options ? options : {};
  return Items.find({name: new RegExp(searchTerm,'ig')},options);
};

Items.topOption = function(searchTerm, options){
  options = options ? options : {};
  return Items.findOne({name: new RegExp("^" + searchTerm,'ig')});
};

