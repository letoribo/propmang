var pageSession = new ReactiveDict();

Template.ManageTimeBlocksInsert.rendered = function() {
	catId = Iron.Location.get().path.slice(32);
};

Template.ManageTimeBlocksInsert.events({
	
});

Template.ManageTimeBlocksInsert.helpers({
	
});

Template.ManageTimeBlocksInsertInsertForm.rendered = function() {
	
	pageSession.set("ManageTimeBlocksInsertInsertFormInfoMessage", "");
	pageSession.set("ManageTimeBlocksInsertInsertFormErrorMessage", "");
   
   $('#datepicker').datepicker();
	$("input[autofocus]").focus();
};

Template.ManageTimeBlocksInsertInsertForm.events({
	"mouseout #maxUsers": function(event){
      var input = event.currentTarget;   
      var inputValue = event.currentTarget.value;   
      if(inputValue.search(/^0/) != -1){
        input.value = "";
        input.setAttribute('placeholder', "Invalid value");  
      }
    },
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("ManageTimeBlocksInsertInsertFormInfoMessage", "");
		pageSession.set("ManageTimeBlocksInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var ManageTimeBlocksInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(ManageTimeBlocksInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("ManageTimeBlocksInsertInsertFormInfoMessage", message);
					}; break;
				}
			}
         //console.log(catId);
			Router.go("admin.manage_timeblocks", {catId: catId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("ManageTimeBlocksInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				//console.log(values);
            
				Meteor.call("createTimeBlock", values, catId, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.manage_timeblocks", {catId: catId});
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

Template.ManageTimeBlocksInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("ManageTimeBlocksInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("ManageTimeBlocksInsertInsertFormErrorMessage");
	}
	
});
