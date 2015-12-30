var pageSession = new ReactiveDict();

Template.BookAppointments.rendered = function() {

};

Template.BookAppointments.events({
	
});

Template.BookAppointments.helpers({
	
});

Template.BookAppointmentsTimeblocksView.rendered = function() {
	pageSession.set("BookAppointmentsTimeblocksViewStyle", "table");
	
};

Template.BookAppointmentsTimeblocksView.events({

});

Template.BookAppointmentsTimeblocksView.helpers({
   
   "isEmpty": function() {
		return !TblBlock.findOne();
	},
	"viewAsTable": function() {
		return pageSession.get("BookAppointmentsTimeblocksViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BookAppointmentsTimeblocksViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BookAppointmentsTimeblocksViewStyle") == "gallery";
	}
	
});


Template.BookAppointmentsTimeblocksViewTable.rendered = function() {
	
};

Template.BookAppointmentsTimeblocksViewTable.events({

});

Template.BookAppointmentsTimeblocksViewTable.helpers({
	"tableItems": function() {
		return TblBlock.find().fetch();
	}
});


Template.BookAppointmentsTimeblocksViewItems.rendered = function() {
	
};

Template.BookAppointmentsTimeblocksViewItems.events({
	
	"click #book-button": function(e, t) {
		e.preventDefault();
		Router.go("user.book_appointments.insert", {blockId: this._id});
		return false;
	},

	"click a": function(e, t) {
		Router.go("user.book_appointments.insert", {blockId: this._id});
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
						Meteor.call("deleteTimeBlock", Id);
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

Template.BookAppointmentsTimeblocksViewItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
