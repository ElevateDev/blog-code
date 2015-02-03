Meteor.publish('search',function(searchTerm){
  check( searchTerm, String );
  if( searchTerm !== "" ){
    return Items.search(searchTerm,{limit: 30});
  }else{
    return [];
  }
});
