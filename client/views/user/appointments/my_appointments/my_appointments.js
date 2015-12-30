var pageSession = new ReactiveDict();

Template.MyAppointments.rendered = function() {

};

Template.MyAppointments.events({
	
});

Template.MyAppointments.helpers({
	
});

var MyAppointmentsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MyAppointmentsViewSearchString");
	var sortBy = pageSession.get("MyAppointmentsViewSortBy");
	var sortAscending = pageSession.get("MyAppointmentsViewSortAscending");
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

Template.MyAppointmentsView.rendered = function() {
	pageSession.set("MyAppointmentsViewStyle", "table");
	
};

Template.MyAppointmentsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_categories.insert", {});
	}
});

Template.MyAppointmentsView.helpers({
	
   "isEmpty": function() {
		return !TblBlockuser.findOne({createdBy: Meteor.userId()});
	},
	"viewAsTable": function() {
		return pageSession.get("MyAppointmentsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MyAppointmentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MyAppointmentsViewStyle") == "gallery";
	}
	
});


Template.MyAppointmentsViewTable.rendered = function() {
	
};

Template.MyAppointmentsViewTable.events({

});

Template.MyAppointmentsViewTable.helpers({
	"tableMyAppointments": function() {
		return MyAppointmentsViewItems(this.user_blocks);
	}
});


Template.MyAppointmentsViewTableAppointments.rendered = function() {
	
};

Template.MyAppointmentsViewTableAppointments.events({
	
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("user.book_appointments.insert", {blockId: this.blockId});
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
						Meteor.call("deleteAppointment", Id);
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

Template.MyAppointmentsViewTableAppointments.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
