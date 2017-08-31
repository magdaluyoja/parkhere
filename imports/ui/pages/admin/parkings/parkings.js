import { Template } from 'meteor/templating';
import { Parkings } from '/imports/api/parkings/parkings.js';
import { Session } from 'meteor/session';

import './parkings.html';

Template.leftnavbar.onCreated(function(){
	
	this.autorun(()=>{
		this.subscribe("allParkingsAdmin");
		this.subscribe("allUsers");
	});
});

Template.App_parkings.helpers({
	'parkingSpaces'(){
		return Parkings.find({}, { sort: { status: 1 } });
	},
	'createdName'(){
		return Meteor.users.find({_id:this.createdBy});
	}
});

Template.App_parkings.events({
	'click #btnsubmit-parking'(){
		var txtparkname 	= $('#txtparkname').val();
		var txtrate 		= $('#txtrate').val();
		var txtspacesno 	= $('#txtspacesno').val();
		var txtspacestatus 	= $('#txtspace-status').val();

		if($("#btnsubmit-parking").text() == "Submit"){
			Meteor.call('saveParking',Meteor.userId(),txtparkname,txtrate,txtspacesno,txtspacestatus);
		}
		else{
			var id = Session.get("parkingId");;
			Meteor.call('updateParking',Meteor.userId(),id,txtparkname,txtrate,txtspacesno,txtspacestatus);

			$('#md-parking-title').text("Add Parking Area");
			Session.set("parkingId",'');
			$('#btnsubmit-parking').text("Submit");
		}
		
		$('#parkingModal').modal('toggle');
		$('.frmparking').val("");
		return false;
	},
	'click .btn-delete'(){
		Meteor.call('deleteParking',Meteor.userId(),this._id);
	},
	'click .btn-edit'(){
		$('#md-parking-title').text("Update Parking Space Details");
		Session.set("parkingId",this._id);
		$('#btnsubmit-parking').text("Update");
		$('#txtparkname').val(this.parkingName);
		$('#txtrate').val(this.rate);
		$('#txtspacesno').val(this.spacesNo);
		$('#txtspace-status').val(this.status);
	}
});