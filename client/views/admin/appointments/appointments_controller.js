this.ManageAppointmentsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'ManageAppointments': { to: 'AdminSubcontent'}
		
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
		   Meteor.subscribe("tbl_blockuser"),
		   Meteor.subscribe("admin_users")
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
			admin_blocks: TblBlockuser.find({}, {}),
			admin_users: Users.find({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});