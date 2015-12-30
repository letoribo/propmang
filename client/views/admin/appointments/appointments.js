var pageSession = new ReactiveDict();

Template.ManageAppointments.rendered = function() {
  //if(this.data) Session.set("admin_blocks",this.data.admin_blocks.fetch());
};

Template.ManageAppointments.events({
	
});

Template.ManageAppointments.helpers({
	/*"catItem": function() {
		return this.admin_category;
	}*/
});


Template.ManageAppointmentsView.rendered = function() {
	pageSession.set("ManageAppointmentsViewStyle", "table");
	
};

Template.ManageAppointmentsView.events({
	/*"submit #dataview-controls": function(e, t) {
		return false;
	},*/

	/*"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_timeblocks.insert", {catId: this._id});
	}*/	
});

Template.ManageAppointmentsView.helpers({
   
   "isEmpty": function() {
		return !TblBlockuser.findOne();
	},
	"viewAsTable": function() {
		return pageSession.get("ManageAppointmentsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ManageAppointmentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ManageAppointmentsViewStyle") == "gallery";
	}
	
});


Template.ManageAppointmentsViewTable.rendered = function() {
	
};

Template.ManageAppointmentsViewTable.events({

});

Template.ManageAppointmentsViewTable.helpers({
	"tableItems": function() {
		return TblBlockuser.find().fetch();//Session.get("admin_blocks"); 
	}
});


Template.ManageAppointmentsViewTableItems.rendered = function() {
	
};

Template.ManageAppointmentsViewTableItems.events({
	
	"click a": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.details", {userId: this.createdBy});
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
	"click #approve-button": function(e, t) {
		e.preventDefault();
		var Id = this._id;
		Meteor.call("approveAppointment", Id);
		return false;
	}
});

Template.ManageAppointmentsViewTableItems.helpers({
	"username": function(createdBy) { 
	   return Users.findOne(createdBy).profile.name 
	 }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
