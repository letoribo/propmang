this.UserMyAppointmentsController = RouteController.extend({
	template: "User",
	

	yieldTemplates: {
		'MyAppointments': { to: 'UserSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("User"); this.render("loading", { to: "UserSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("tbl_block_my")
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
			user_blocks: TblBlockuser.find({createdBy: Meteor.userId()}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});