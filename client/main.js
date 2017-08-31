import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';

var redirectMe = function(){
	if(Meteor.userId()){
		$('#loginModal').modal('hide');
		// FlowRouter.go('/');
	}
}

AccountsTemplates.configure({
	onSubmitHook: redirectMe,
});