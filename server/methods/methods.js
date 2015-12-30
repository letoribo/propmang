Meteor.methods({
  "makeMeAdmin": function(userId) {
  	  if (userId !== Meteor.userId()) return;
  	  Meteor.users.update({
       _id: userId
     }, {
      $set: {
        roles: ["admin"]
      }
    });
  },
  "createItem": function(item) {
  	   //console.log(item);
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
		TblItem.insert(item);
		//console.log(TblItem.find().fetch());
	},
  "updateItem": function(Id, options) {
  	  if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
  	  var itemOptions = {};
		if(options.item.name) itemOptions.name = options.item.name;
		if(options.item.street_address1) itemOptions.street_address1 = options.item.street_address1;
		if(options.item.street_address2) itemOptions.street_address2 = options.item.street_address2;
		if(options.item.city) itemOptions.city = options.item.city;
		if(options.item.state) itemOptions.state = options.item.state;
		if(options.item.zip) itemOptions.zip = options.item.zip;
		if(options.item.contact_name) itemOptions.contact_name = options.item.contact_name;
		//console.log("itemOptions", itemOptions);
		if(itemOptions) {
			TblItem.update(Id, { $set: {item: itemOptions} });
		} 	  
  },
  "deleteItem": function(Id) {
  	  TblItem.remove(Id);
  },
  "createCategory": function(item) {
  	   //console.log(item);
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
		TblCategory.insert(item);
	},
  "deleteCategory": function(Id) {
  	  if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
  	  TblCategory.remove(Id);
  	  TblBlock.remove({catId: Id});
  	  TblBlockuser.remove({catId: Id});
  },
  "updateCategory": function(Id, options) {
  	  if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

  	  var categoryOptions = {};
		if(options.category.name) categoryOptions.name = options.category.name;
		if(options.category.description) categoryOptions.description = options.category.description;
		//console.log("categoryOptions", categoryOptions);
		if(categoryOptions) {
			TblCategory.update(Id, { $set: {category: categoryOptions} });
		}  	  
  },
  "createTimeBlock": function(item, catId) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
		item.catId = catId;
		var cat = TblCategory.findOne(catId);
		item.catName = cat.category.name;
		item.catDesc = cat.category.description;
		//console.log(item);
		TblBlock.insert(item);
	},
  "deleteTimeBlock": function(Id) {
  	  if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
  	  return TblBlock.remove(Id) && TblBlockuser.remove({blockId: Id});
  },
  "updateTimeblock": function(Id, options) {
  	  if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

  	  var timeblockOptions = {};
		if(options.timeblock.date) timeblockOptions.date = options.timeblock.date;
		if(options.timeblock.start_time) timeblockOptions.start_time = options.timeblock.start_time;
		if(options.timeblock.end_time) timeblockOptions.end_time = options.timeblock.end_time;
		if(options.timeblock.max_users) timeblockOptions.max_users = options.timeblock.max_users;
		if(options.timeblock.waitlist_max) timeblockOptions.waitlist_max = options.timeblock.waitlist_max;
		//console.log("timeblockOptions", timeblockOptions);
		if(timeblockOptions) {
			TblBlock.update(Id, { $set: {timeblock: timeblockOptions} });
		} 	  
  },
  "createAppointment": function(item, blockId) {
  	   existed = TblBlockuser.findOne({
  	   	blockId: blockId,
  	   	createdBy: Meteor.userId()
  	   });
      if (_.isUndefined(existed)) {
        var block = TblBlock.findOne(blockId);
        var maxUsers = block.timeblock.max_users;
        var waitlistMax = block.timeblock.waitlist_max;
        var blocksCount = TblBlockuser.find({blockId: blockId}).count();
        //console.log("blocksCount:", blocksCount, "maxUsers:", maxUsers, "waitlistMax:", waitlistMax);        
        if(blocksCount >= Number(maxUsers) + Number(waitlistMax)) {
        	 throw new Meteor.Error("There are no free spaces.", "Timeblock is full.");
		  }
  	     item.catId = block.catId;
  	     item.catName = block.catName;
  	     item.date = block.timeblock.date;
  	     item.start_time = block.timeblock.start_time;
  	     item.end_time = block.timeblock.end_time;
  	     item.blockId = blockId;
  	     item.status = blocksCount < Number(maxUsers) ? 'pending' : 'waitlist';
  	     console.log(item);
  	     TblBlockuser.insert(item);
      }
      else {
        TblBlockuser.update(existed._id, {
          $set: {
            block_user: item.block_user
          }
        });
      }
	},
  "approveAppointment": function(Id) {
  	  var status = TblBlockuser.findOne(Id).status;
  	  status = status == "pending" ? "approved" : "pending";
  	  //console.log(status);
  	  TblBlockuser.update(Id, { $set: {status: status} });
  },
  "deleteAppointment": function(Id) {
  	  var blockId = TblBlockuser.findOne(Id).blockId;
  	  var blockStatus = TblBlockuser.findOne(Id).status;
  	  //console.log(blockId);
  	  TblBlockuser.remove(Id);
  	  if(blockStatus !== "waitlist") {
  	    var waitlisted = TblBlockuser.find({blockId: blockId, status: "waitlist"}).fetch();
  	    if(_.isEmpty(waitlisted)) return;
  	    var toBeUpdated = _.first(waitlisted)._id;
  	    //console.log(toBeUpdated);
  	    TblBlockuser.update(toBeUpdated, { $set: {status: "pending"} });
  	  }
  }
});