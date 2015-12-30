TblBlockuser.allow({
	insert: function (userId, doc) {
		return TblBlockuser.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TblBlockuser.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TblBlockuser.userCanRemove(userId, doc);
	}
});

TblBlockuser.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

TblBlockuser.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TblBlockuser.before.remove(function(userId, doc) {
	
});

TblBlockuser.after.insert(function(userId, doc) {
	
});

TblBlockuser.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TblBlockuser.after.remove(function(userId, doc) {
	
});
