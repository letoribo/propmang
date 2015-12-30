this.TblCategory = new Mongo.Collection("tbl_category");

this.TblCategory.userCanInsert = function(userId, doc) {
	return true;
}

this.TblCategory.userCanUpdate = function(userId, doc) {
	return true;
}

this.TblCategory.userCanRemove = function(userId, doc) {
	return true;
}
