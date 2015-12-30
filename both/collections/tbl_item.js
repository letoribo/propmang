this.TblItem = new Mongo.Collection("tbl_item");

this.TblItem.userCanInsert = function(userId, doc) {
	return true;
}

this.TblItem.userCanUpdate = function(userId, doc) {
	return true;
}

this.TblItem.userCanRemove = function(userId, doc) {
	return true;
}
