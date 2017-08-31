import { Template } from 'meteor/templating';

import './topnav.html';

Template.topnavbar.onCreated(function(){
	this.autorun(()=>{
		this.subscribe("myUser");
	});
});
Template.topnavbar.helpers({
	"userName"(){
		return Meteor.user();
	}
});
Template.topnavbar.events({
	'click .nav a'(){
	   $('.navbar-collapse.in').collapse('hide');
	},
	'click #menu-toggle'(e){
	   	e.preventDefault();
        $("#wrapper").toggleClass("active");
	}
});
