TblBlock.allow({
	insert: function (userId, doc) {
		return TblBlock.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TblBlock.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TblBlock.userCanRemove(userId, doc);
	}
});

TblBlock.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

TblBlock.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TblBlock.before.remove(function(userId, doc) {
	
});

TblBlock.after.insert(function(userId, doc) {
	
});

TblBlock.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TblBlock.after.remove(function(userId, doc) {
	
});
