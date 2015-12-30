var pageSession = new ReactiveDict();

Template.AppointmentsInsert.rendered = function() {
	
};

Template.AppointmentsInsert.events({
	
});

Template.AppointmentsInsert.helpers({
	
});

Template.AppointmentsInsertForm.rendered = function() {
	

	pageSession.set("AppointmentsInsertEditFormInfoMessage", "");
	pageSession.set("AppointmentsInsertEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.AppointmentsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("AppointmentsInsertEditFormInfoMessage", "");
		pageSession.set("AppointmentsInsertEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var AppointmentsInsertEditFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(AppointmentsInsertEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("AppointmentsInsertEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("user.my_appointments", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("AppointmentsInsertEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				var blockId = self.params['blockId']; //Iron.Location.get().path.slice(31);
				Meteor.call("createAppointment", values, blockId, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("user.my_appointments", {});
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

Template.AppointmentsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("AppointmentsInsertEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("AppointmentsInsertEditFormErrorMessage");
	}
	
});
