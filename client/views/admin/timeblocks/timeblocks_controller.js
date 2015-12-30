this.ManageTimeBlocksController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'ManageTimeBlocks': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
		   Meteor.subscribe("tbl_category", this.params.catId),
			Meteor.subscribe("tbl_blocks", this.params.catId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			admin_category: TblCategory.findOne(this.params.catId, {}),
			admin_timeblocks: TblBlock.find({catId: this.params.catId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});