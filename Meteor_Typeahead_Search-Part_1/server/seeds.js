Meteor.startup(function() {

  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if( Items.find().count() === 0 ){
    _(15000).times(function(){
      Factory.create("item");
    });
  }

});
