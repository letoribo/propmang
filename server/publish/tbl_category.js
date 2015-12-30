Meteor.publish('tbl_category', function() {
  return TblCategory.find();
});