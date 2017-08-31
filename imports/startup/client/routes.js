import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/topnav/topnav.js';
import '../../ui/layouts/leftnav/leftnav.js';
import '../../ui/layouts/msgs/msgs.js';

import '../../ui/pages/home/home.js';
import '../../ui/pages/aboutus/aboutus.js';
import '../../ui/pages/contact/contact.js';
import '../../ui/pages/register/register.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/user/profile/profile.js';
import '../../ui/pages/not-found/not-found.js'; 

import '../../ui/pages/admin/users/users.js';
import '../../ui/pages/admin/parkings/parkings.js';

import '../../ui/pages/user/profile/profile.js';
import '../../ui/pages/user/parkings/parkings.js';
import '../../ui/pages/user/myaccount/transactions/transactions.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'home',
    action() {
      	document.title = "ParkHere | Home";
        BlazeLayout.render('App_body', { main: 'App_home' });
    },
});
FlowRouter.route('/aboutus', {
    name: 'aboutus',
    action() {
      	document.title = "ParkHere | About Us";
        BlazeLayout.render('App_body', { main: 'App_aboutus' });
    },
});
FlowRouter.route('/contact', {
    name: 'contact',
    action() {
      	document.title = "ParkHere | Contact Us";
        BlazeLayout.render('App_body', { main: 'App_contact' });
  },
});
FlowRouter.route('/logout', {
    name: 'logout',
    triggersEnter: [function(context, redirect) {
        Meteor.logout();
        redirect('/');
        BlazeLayout.render('App_body', { main: 'App_home' });
    }],
});
FlowRouter.notFound = {
    action() {
      	document.title = "ParkHere | Page Not Found";
        BlazeLayout.render('App_body', { main: 'App_notFound' });
  	},
};
//admin routes
var adminRoutes = FlowRouter.group({
	prefix:'/admin',
	name:'admin',
});
adminRoutes.route('/users',{
	name:'users',
	action() {
      	document.title = "ParkHere | Users";
        BlazeLayout.render('App_body', { main: 'App_users' });
  	},
});
adminRoutes.route('/parkings',{
	name:'parkings',
	action() {
      	document.title = "ParkHere | Manage Parking Spaces";
        BlazeLayout.render('App_body', { main: 'App_parkings' });
  	},
});

//user routes
var userRoutes = FlowRouter.group({
  prefix:'/user',
  name:'user',
});
userRoutes.route('/myprofile',{
  name:'profile',
  action() {
        document.title = "ParkHere | My Profile";
        BlazeLayout.render('App_body', { main: 'App_profile' });
    },
});
userRoutes.route('/myaccount/transactions',{
  name:'transactions',
  action() {
        document.title = "ParkHere | My Transacions";
        BlazeLayout.render('App_body', { main: 'App_transactions' });
    },
});
userRoutes.route('/parkings',{
  name:'parkingAreas',
  action() {
        document.title = "ParkHere | Parking Areas";
        BlazeLayout.render('App_body', { main: 'App_parkingAreas' });
    },
});