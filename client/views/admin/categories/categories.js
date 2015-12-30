var pageSession = new ReactiveDict();

Template.ManageCategories.rendered = function() {
	
};

Template.ManageCategories.events({
	
});

Template.ManageCategories.helpers({
	
});

var ManageCategoriesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ManageCategoriesViewSearchString");
	var sortBy = pageSession.get("ManageCategoriesViewSortBy");
	var sortAscending = pageSession.get("ManageCategoriesViewSortAscending");
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

Template.ManageCategoriesView.rendered = function() {
	pageSession.set("ManageCategoriesViewStyle", "table");
	
};

Template.ManageCategoriesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_categories.insert", {});
	}
});

Template.ManageCategoriesView.helpers({
	
   "isEmpty": function() {
		return !this.admin_category || this.admin_category.count() == 0;
	},
	"viewAsTable": function() {
		return pageSession.get("ManageCategoriesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ManageCategoriesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ManageCategoriesViewStyle") == "gallery";
	}
	
});


Template.ManageCategoriesViewTable.rendered = function() {
	
};

Template.ManageCategoriesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ManageCategoriesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ManageCategoriesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ManageCategoriesViewSortAscending") || false;
			pageSession.set("ManageCategoriesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ManageCategoriesViewSortAscending", true);
		}
	}
});

Template.ManageCategoriesViewTable.helpers({
	"tableCategories": function() {
		//console.log(this);
		return ManageCategoriesViewItems(this.admin_category);
	}
});


Template.ManageCategoriesViewTableCategories.rendered = function() {
	
};

Template.ManageCategoriesViewTableCategories.events({
	
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_categories.edit", {catId: this._id});
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
						Meteor.call("deleteCategory", Id);
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		
		return false;
	},

	"click a": function(e, t) {
		Router.go("admin.manage_timeblocks", {catId: this._id});
	}	
});

Template.ManageCategoriesViewTableCategories.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
