this.TblBlock = new Mongo.Collection("tbl_block");

this.TblBlock.userCanInsert = function(userId, doc) {
	return true;
}

this.TblBlock.userCanUpdate = function(userId, doc) {
	return true;
}

this.TblBlock.userCanRemove = function(userId, doc) {
	return true;
}
