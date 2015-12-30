var pageSession = new ReactiveDict();

Template.ManageTimeBlocksEdit.rendered = function() {
	
};

Template.ManageTimeBlocksEdit.events({
	
});

Template.ManageTimeBlocksEdit.helpers({
	
});

Template.ManageTimeBlocksEditEditForm.rendered = function() {	

	pageSession.set("ManageTimeBlocksEditEditFormInfoMessage", "");
	pageSession.set("ManageTimeBlocksEditEditFormErrorMessage", "");

	$("input[autofocus]").focus();
};

Template.ManageTimeBlocksEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("ManageTimeBlocksEditEditFormInfoMessage", "");
		pageSession.set("ManageTimeBlocksEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var ManageTimeBlocksEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(ManageTimeBlocksEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("ManageTimeBlocksEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.manage_timeblocks", {catId: t.data.admin_timeblock.catId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("ManageTimeBlocksEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {				
				Meteor.call("updateTimeblock", t.data.admin_timeblock._id, values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.manage_timeblocks", {catId: t.data.admin_timeblock.catId});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminUsersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("ManageTimeBlocksEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("ManageTimeBlocksEditEditFormErrorMessage");
	}
	
});
