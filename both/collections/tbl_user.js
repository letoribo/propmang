this.TblUser = new Mongo.Collection("tbl_user");

this.TblUser.userCanInsert = function(userId, doc) {
	return true;
}

this.TblUser.userCanUpdate = function(userId, doc) {
	return true;
}

this.TblUser.userCanRemove = function(userId, doc) {
	return true;
}
