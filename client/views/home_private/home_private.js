Template.HomePrivate.rendered = function() {

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
  if(!player) return; 
  var isAdmin = _.isEqual(player.roles[0], "admin")
  return isAdmin;
}
