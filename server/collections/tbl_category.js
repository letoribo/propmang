TblCategory.allow({
	insert: function (userId, doc) {
		return TblCategory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TblCategory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TblCategory.userCanRemove(userId, doc);
	}
});

TblCategory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

TblCategory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TblCategory.before.remove(function(userId, doc) {
	
});

TblCategory.after.insert(function(userId, doc) {
	
});

TblCategory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TblCategory.after.remove(function(userId, doc) {
	
});
