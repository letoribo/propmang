var pageSession = new ReactiveDict();

Template.ManageItems.rendered = function() {
	
};

Template.ManageItems.events({
	
});

Template.ManageItems.helpers({
	
});

var ManageItemsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ManageItemsViewSearchString");
	var sortBy = pageSession.get("ManageItemsViewSortBy");
	var sortAscending = pageSession.get("ManageItemsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "roles"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

/*var ManageItemsViewExport = function(cursor, fileType) {
	var data = ManageItemsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}*/


Template.ManageItemsView.rendered = function() {
	pageSession.set("ManageItemsViewStyle", "table");
	
};

Template.ManageItemsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	/*"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("ManageItemsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("ManageItemsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("ManageItemsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},*/

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_items.insert", {});
	}/*,

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ManageItemsViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ManageItemsViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ManageItemsViewExport(this.admin_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ManageItemsViewExport(this.admin_users, "json");
	}*/

	
});

Template.ManageItemsView.helpers({

	"isEmpty": function() {
		return !this.items || this.items.count() == 0;
	},
	"viewAsTable": function() {
		return pageSession.get("ManageItemsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ManageItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ManageItemsViewStyle") == "gallery";
	}
	
});


Template.ManageItemsViewTable.rendered = function() {
	
};

Template.ManageItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ManageItemsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ManageItemsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ManageItemsViewSortAscending") || false;
			pageSession.set("ManageItemsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ManageItemsViewSortAscending", true);
		}
	}
});

Template.ManageItemsViewTable.helpers({
	"tableItems": function() {
		return ManageItemsViewItems(this.items);
	}
});


Template.ManageItemsViewTableItems.rendered = function() {
	
};

Template.ManageItemsViewTableItems.events({
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_items.edit", {itemId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Users.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var Id = this._id;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("deleteItem", Id);
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		
		return false;
	}
});

Template.ManageItemsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
