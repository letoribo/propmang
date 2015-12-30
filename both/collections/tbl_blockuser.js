this.TblBlockuser = new Mongo.Collection("tbl_blockuser");

this.TblBlockuser.userCanInsert = function(userId, doc) {
	return true;
}

this.TblBlockuser.userCanUpdate = function(userId, doc) {
	return true;
}

this.TblBlockuser.userCanRemove = function(userId, doc) {
	return true;
}
