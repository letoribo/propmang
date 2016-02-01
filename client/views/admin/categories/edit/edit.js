var pageSession = new ReactiveDict();

Template.ManageCategoriesEdit.rendered = function() {
	
};

Template.ManageCategoriesEdit.events({
	
});

Template.ManageCategoriesEdit.helpers({
	
});

Template.ManageCategoriesEditEditForm.rendered = function() {
	var item = this.data.admin_category.category.item_name;
   Session.set('item', item);
  	pageSession.set("manageCategoriesEditEditFormInfoMessage", "");
	pageSession.set("manageCategoriesEditEditFormErrorMessage", "");

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

Template.ManageCategoriesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("manageCategoriesEditEditFormInfoMessage", "");
		pageSession.set("manageCategoriesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var manageCategoriesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(manageCategoriesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("manageCategoriesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.manage_categories", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("manageCategoriesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {				
				Meteor.call("updateCategory", t.data.admin_category._id, values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.manage_categories", {});
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

Template.ManageCategoriesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("manageCategoriesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("manageCategoriesEditEditFormErrorMessage");
	},
	"items": function() {
		return ["CollegeVista", "CanadaVista", "Palos Hills"];
	},
	"selected_item": function(value) {
		var item = Session.get('item') == value ? 'selected' : '';
		return item;
	}
});
