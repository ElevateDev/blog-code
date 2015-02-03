Template.typeahead.subscriptions = function(){
  var searchTerm = Session.get("searchTerm");
  if( searchTerm && searchTerm !== "" ){
    return [["search",searchTerm]];
  }else{
    return [];
  }
};

Template.typeahead.events({
  'keyup #typeahead': function(e, template){
    Session.set("searchTerm", $('#typeahead').val());
    template.subscriptionsChanged();
  }
});

Template.typeahead.helpers({
  items: function(){
    return Items.search( Session.get("searchTerm"));
  },
  hint: function(){
    var item = Items.topOption("searchTerm");
    if( item ){
      // Handle case differences
      return item.name.replace(new RegExp(Session.get("searchTerm"),"ig"), Session.get("searchTerm"));
    }
    return "";
  },
  highlightedName: function(){
    var model = UI._templateInstance().model;
    return _.escape(this.name).replace(new RegExp(Session.get("searchTerm"),"ig"),'<strong>$&</strong>');
  }
});
