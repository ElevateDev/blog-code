Meteor.startup(function() {

  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if( Items.find().count() === 0 ){
    _(5000).times(function(){
      Factory.create("item");
    });
  }

});
