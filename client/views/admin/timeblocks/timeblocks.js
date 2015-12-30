var pageSession = new ReactiveDict();

Template.ManageTimeBlocks.rendered = function() {

};

Template.ManageTimeBlocks.events({
	
});

Template.ManageTimeBlocks.helpers({
	"catItem": function() {
		return this.admin_category;
	}
});


Template.ManageTimeBlocksView.rendered = function() {
	pageSession.set("ManageTimeBlocksViewStyle", "table");
	
};

Template.ManageTimeBlocksView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_timeblocks.insert", {catId: this._id});
	}	
});

Template.ManageTimeBlocksView.helpers({
   
   "isEmpty": function() {
		return !TblBlock.findOne();
	},
	"viewAsTable": function() {
		return pageSession.get("ManageTimeBlocksViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ManageTimeBlocksViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ManageTimeBlocksViewStyle") == "gallery";
	}
	
});


Template.ManageTimeBlocksViewTable.rendered = function() {
	
};

Template.ManageTimeBlocksViewTable.events({

});

Template.ManageTimeBlocksViewTable.helpers({
	"tableItems": function() {
		return TblBlock.find().fetch();
	}
});


Template.ManageTimeBlocksViewTableItems.rendered = function() {
	
};

Template.ManageTimeBlocksViewTableItems.events({
	
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.manage_timeblocks.edit", {blockId: this._id});
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

Template.ManageTimeBlocksViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
