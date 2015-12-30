Meteor.publish('tbl_blockuser', function(Id) {
  var blocks = TblBlockuser.find({status: {$ne: "waitlist"}});
  return blocks;
});

Meteor.publish('tbl_block_my', function() {
  var blocks = TblBlockuser.find();
  return blocks;
});