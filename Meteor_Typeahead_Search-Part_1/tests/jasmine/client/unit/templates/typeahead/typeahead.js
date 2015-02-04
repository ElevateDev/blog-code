/*describe("Typeahead Template", function(){
  var $div;
  // Setting layoutTemplate to null to avoid stubbing the template completely.
  // Must happen here, because it will have otherwise run by the time beforeEach runs.
  Router.configure({
    layoutTemplate: null
  });

  beforeEach(function () {
    $div = $('<div>');
  });

  var render = function () {
    return Blaze.render(Template.typeahead, $div.get(0));
  };

  it("should subscribe when something is typed",function(){
    var view = render();
    //console.log( Template.typeahead.__eventMaps );
    spyOn(Template.typeahead, "subscriptionsChanged");
    $('#typeahead').val('hello');
    $('#typeahead').keyup();
    //expect(Template.typeahead.subscriptionsChanged).toHaveBeenCalled();
  });
});*/
