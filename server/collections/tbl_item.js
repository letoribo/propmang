TblItem.allow({
	insert: function (userId, doc) {
		return TblItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TblItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TblItem.userCanRemove(userId, doc);
	}
});

TblItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

TblItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TblItem.before.remove(function(userId, doc) {
	
});

TblItem.after.insert(function(userId, doc) {
	
});

TblItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TblItem.after.remove(function(userId, doc) {
	
});
