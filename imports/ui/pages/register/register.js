
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
// import { Customers } from '../api/customer/customer.js';

import './register.html';

// Template.App_register.helpers({
// 	admin(){
// 		return Roles.userIsInRole( Meteor.userId(),'admin' ); 
// 	}
// });

Template.App_register.events({
	'submit .frmregister'(event){
		event.preventDefault();

		var name = $('#name').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var confirmpassword = $('#confirm-password').val();
		var contactno = $('#contactno').val();
		var plateno = $('#plateno').val();
		if(password !== confirmpassword){
			$('#confirm-password').val('');
			alert('Passwords did not match.');
		}else
		{
			Meteor.call('user.insert', name,email,password,contactno,plateno);
		}
	}
});