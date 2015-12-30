Meteor.publish('tbl_blocks', function(Id) {
  var blocks = _.isUndefined(Id) ? TblBlock.find() : TblBlock.find({catId: Id});
  return blocks;
});

Meteor.publish('tbl_block', function(Id) {
  return TblBlock.find({
    _id: Id
  });
});