import { Template } from 'meteor/templating';

import './login.html';

Template.App_login.events({
	'submit .frmlogin'(event){
		event.preventDefault();

		var email = $('#email').val();
		var password = $('#password').val();

		Meteor.loginWithPassword(email,password);

		FlowRouter.go('App.home');
	}
});