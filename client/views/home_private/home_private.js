Template.HomePrivate.rendered = function() {
  Session.set("yourID", Meteor.userId());
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
  isAdmin: function () {
    return status();
  }
});

var status = function(){
  var player = Users.findOne();
  var isAdmin = _.isEqual(player.roles[0], "admin")
  return isAdmin;
}
