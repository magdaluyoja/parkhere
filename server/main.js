import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Parkings } from '/imports/api/parkings/parkings.js';
import { ParkingTrx } from '/imports/api/parkings/parkings.js';

Meteor.startup(() => {
  // code to run on server at startup
});

var addRoles = function(userId,info){
	Roles.addUsersToRoles(userId, 'admin');
}

AccountsTemplates.configure({
	postSignUpHook:addRoles,
});


Meteor.publish('allUsers',function(){
	if(Roles.userIsInRole(this.userId, 'admin')){
		return Meteor.users.find({});
	}
});
Meteor.publish('myUser',function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId});
	}
});

Meteor.publish('allParkingsAdmin',function(){
	return Parkings.find({});
});

Meteor.publish('userParkings',function(){
	return Parkings.find({status: 'Active'});
});

Meteor.publish('myParkings',function(){
	return ParkingTrx.find({parkedBy: this.userId});
});
Meteor.publish('allParkingTrx',function(){
	return ParkingTrx.find({});
});

Meteor.methods({
	'saveParking'(id,txtparkname,txtrate,txtspacesno,txtspacestatus){
		var admin = Roles.userIsInRole(id,'admin')
		if(admin){
			Parkings.insert({
				parkingName: txtparkname,
				spacesNo: txtspacesno,
				status: txtspacestatus,
				createdAt: new Date(),
				createdBy:id,
				rate: txtrate,
			});
		}else{
			throw new Meteor.error("Not authorized.");
		}
	},
	'updateParking'(userid,id,txtparkname,txtrate,txtspacesno,txtspacestatus){
		var admin = Roles.userIsInRole(userid,'admin')
		if(admin){
			Parkings.update(id,{$set:{
					parkingName: txtparkname,
					spacesNo: txtspacesno,
					status: txtspacestatus,
					updateddAt: new Date(),
					updatedBy:userid,
					rate: txtrate,
				}
			});
		}else{
			throw new Meteor.error("Not authorized.");
		}
	},
	'deleteParking'(userid,parkingId){
		var admin = Roles.userIsInRole(userid,'admin')
		if(admin){
			Parkings.remove(parkingId);
		}else{
			throw new Meteor.error("Not authorized.");
		}
	},
	'setAdminRole'(id,isadmin){
		var admin = Roles.userIsInRole(this.userId,'admin')
		if(admin){
			if(isadmin){
				Roles.addUsersToRoles(id,'admin');
			}
			else{
				Roles.removeUsersFromRoles(id,'admin');Roles.removeUsersFromRoles(id,'amdin');
			}
		}else{
			throw new Meteor.error("Not authorized.");
		}
	},
	'saveTrx'(parkingAreaId,rate,slotNo){
		if(this.userId){
			ParkingTrx.insert({
				parkingAreaId: parkingAreaId,
				rate: rate,
				slotNo: slotNo,
				parkedAt: new Date(),
				parkedBy:this.userId,
				status:"Active",
			});
		}
	},
	"savePayment"(trxId,payment,minutes,amount){
		if(this.userId){
			ParkingTrx.update(trxId,{$set:{
					paymentMethod: payment,
					duration: minutes,
					amount: amount,
					unparkedAt: new Date(),
					status: 'closed',
				}
			});
		}else{
			throw new Meteor.error("Not authorized.");
		}
	}
});