import { Template } from 'meteor/templating';

import './profile.html'

Template.App_profile.onCreated(function(){
	
	this.autorun(()=>{
		this.subscribe("myUser");
	});
});

Template.App_profile.helpers({
  	'user'(){
	  	return Meteor.user();
  	},
  	'emailAddress'(){
	  	var user = Meteor.user();
		if (user && user.emails){
		    return user.emails[0].address;
		}
  	}
});