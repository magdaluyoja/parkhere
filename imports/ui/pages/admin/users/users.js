import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';

import './users.html';

Template.App_users.onCreated(function(){
	this.autorun(()=>{
		this.subscribe("allUsers");
	});
});
Template.App_users.helpers({
	users:function(){
		return Meteor.users.find({});
	},
	'userEmail'(){
		return this.emails[0].address;
	},
	isAdmin:function(){
		return Meteor.users.findOne({'_id':this._id});
	},
});
Template.App_users.events({
	"click .btn-set-role"(){
		var isAdmin = Roles.userIsInRole(this._id,'admin') ? '' : 'admin';
		Meteor.call('setAdminRole',this._id,isAdmin);
	}
});