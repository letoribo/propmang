Meteor.publish('tbl_items', function() {
  return TblItem.find();
});

Meteor.publish('tbl_item', function(Id) {
  return TblItem.find({
    _id: Id
  });
});