function HomeModelImpl(template){
  this.browseMode= new ReactiveVar(false);
  this.template = template;
  this.next = 40; // down arrow
  this.previous = 38; // up arrow
  this.selectTop = 39; // right arrow
  this.undo = 8;
  this.hintElem = '#typeahead-hint';
  this.inputElem = '#typeahead';
  this.searchTerm = new ReactiveVar("");
  this.selectedIndex = new ReactiveVar(undefined);
}

HomeModelImpl.prototype._updateSearch = function(){
  if( !this.browseMode.get() && this.searchTerm.get() !== $(this.inputElem).val() ){
    this.searchTerm.set($(this.inputElem).val());
    this.selectedIndex.set(undefined);
    this.template.subscriptionsChanged();
  }
};

HomeModelImpl.prototype._exitBrowseMode = function(){
  $(this.inputElem).val( this.searchTerm.get() );
  this.browseMode.set(false);
  this.selectedIndex.set(undefined);
};

HomeModelImpl.prototype._setBrowsedText = function(text){
  this.browseMode.set(true);
  $(this.hintElem).val( "" );
  $(this.inputElem).val( item.name );
};

HomeModelImpl.prototype._selectTop = function(){
  var item = Items.topOption( this.searchTerm.get() );
  if( this.browseMode.get() ){
    item = this.getItems().fetch()[this.selectedIndex.get()];
    this._exitBrowseMode();
    $(this.inputElem).val( item.name );
    this._updateSearch( );
  }else if( item ){
    this.searchTerm.set(item.name );
    $(this.inputElem).val( item.name );
    this.template.model._updateSearch( );
  }else{
    console.log( "item not found" );
  }
};

HomeModelImpl.prototype._next = function(){
  if( this.selectedIndex.get() === undefined ){
    if( this.getItems().count() > 0 ){
      this.selectedIndex.set(0);
      item = this.getItems().fetch()[0];
      this._setBrowsedText( item.name );
    }
  }else{
    if( this.selectedIndex.get() < this.getItems().count()){
      this.selectedIndex.set(this.selectedIndex.get()+1);
      item = this.getItems().fetch()[this.selectedIndex.get()];
      this._setBrowsedText( item.name );
    }
  }
};

HomeModelImpl.prototype._previous = function(){
  if( this.selectedIndex.get() > 0 ){
    this.selectedIndex.set(this.selectedIndex.get()-1);
    item = this.getItems().fetch()[this.selectedIndex.get()];
    this._setBrowsedText( item.name );
  }else{
    this._exitBrowseMode();
  }
};

HomeModelImpl.prototype.handleKeydown = function(e){
  console.log( e.keyCode );
  if( e.keyCode == this.selectTop ){
    e.preventDefault();
    e.stopPropagation();
    this._selectTop();
  }else if( e.keyCode == this.next ){
    e.preventDefault();
    e.stopPropagation();
    this._next();
  }else if( e.keyCode == this.previous ){
    e.preventDefault();
    e.stopPropagation();
    this._previous();
  }else{
    if( this.browseMode.get() ){
      this._exitBrowseMode();
    }
  }
};

Template.home.subscriptions = function(){
  var template = UI._templateInstance();
  var model = template.model;
  if( model && model.searchTerm.get() !== "" ){
    console.log( model.searchTerm.get() );
    return [["search",model.searchTerm.get()]];
  }else{
    return [];
  }
};

Template.home.created = function(temp){
  this.model = new HomeModelImpl(this); 
  this.model.getItems = function(){
    return Items.search(this.searchTerm.get(),{limit: 30});
  };
};

Template.home.cacheManager = new SubsManager({
  cacheLimit: 20,
  expireIn: 2
});

Template.home.helpers({
  items: function(){
    var template = UI._templateInstance();
    var items = template.model.getItems();
    return items.map(function(item,key){ 
      if( key === template.model.selectedIndex.get() ){
        item.selected = true;
      }
      return item;
    });
  },
  hint: function(){
    var template = UI._templateInstance();
    var item = Items.topOption( template.model.searchTerm.get() );
    if( !template.model.browseMode.get() && item && template.model.searchTerm.get() !== "" ){
      // Handle case differences
      return item.name.replace(new RegExp(template.model.searchTerm.get(),"ig"), template.model.searchTerm.get());
    }
    return "";
  },
  highlightedName: function(){
    var model = UI._templateInstance().model;
    return _.escape(this.name).replace(new RegExp(model.searchTerm.get(),"ig"),'<strong>$&</strong>');
  },
  selected: function(){
    if( this.selected ){
      return "active";
    }
    return "";
  }
});

Template.home.events({
  'keyup #typeahead': function(e, template){
    template.model._updateSearch();
  },
  'keydown #typeahead': function(e, template){
    template.model.handleKeydown(e);
  }
});
