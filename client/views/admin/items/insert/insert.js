var pageSession = new ReactiveDict();

Template.ManageItemsInsert.rendered = function() {
	
};

Template.ManageItemsInsert.events({
	
});

Template.ManageItemsInsert.helpers({
	
});

Template.ManageItemsInsertInsertForm.rendered = function() {
	

	pageSession.set("ManageItemsInsertInsertFormInfoMessage", "");
	pageSession.set("ManageItemsInsertInsertFormErrorMessage", "");

	/*$(".input-group.date").each(function() {
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

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");*/
	$("input[autofocus]").focus();
};

Template.ManageItemsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("ManageItemsInsertInsertFormInfoMessage", "");
		pageSession.set("ManageItemsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var ManageItemsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(ManageItemsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("ManageItemsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.manage_items", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("ManageItemsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				Meteor.call("createItem", values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.manage_items", {});
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

Template.ManageItemsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("ManageItemsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("ManageItemsInsertInsertFormErrorMessage");
	}
	
});
