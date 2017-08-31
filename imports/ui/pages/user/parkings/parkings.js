import { Template } from 'meteor/templating';
import { Parkings } from '/imports/api/parkings/parkings.js';
import { ParkingTrx } from '/imports/api/parkings/parkings.js';
// import { Session } from 'meteor/session';

import './parkings.html';

Template.App_parkingAreas.onCreated(function(){
	
	this.autorun(()=>{
		this.subscribe("userParkings");
		this.subscribe("myUser");
		this.subscribe("myParkings");
		this.subscribe("allParkingTrx");
	});
});
Template.App_parkingAreas.onRendered(function(){
	
	$('[data-toggle="tooltip"]').tooltip();   
});

Template.App_parkingAreas.helpers({
	'parkingAreas'(){
		return Parkings.find({status: 'Active'});
	},
	'slotsLeft'(){
		// return this.spaceNo - ;
	},
	'parkingSlots'(){
		var slotsGroup 	= "";
		var isUsed		= "";
		var usedDisable = "";
		var iWantToPark	= "";
		
		var myActiveParking	= ParkingTrx.find({status: 'Active', parkedBy: Meteor.userId()}).count();

		var loginErrMsg		= Meteor.userId() ? "" : "title = ' Please login to park. '";
		var parkingActiveErr= myActiveParking ? "title = ' You have an active parking. '" : "";
		var inUseErr	= "";

		var isLoggedIn	=	Meteor.userId() ? "" : " disabled ";
		iWantToPark 	= 	myActiveParking ? " disabled " : "";

		slotsGroup += "	<div class='btn-group colors' data-toggle='buttons'>";
			for(var a = 1; a <= this.spacesNo; a++ ){

				isUsed		=	ParkingTrx.find({parkingAreaId: this._id, status: 'Active',slotNo: a.toString()}).count();
				usedDisable = 	isUsed ? " disabled " : "";
				inUseErr	=	isUsed ? " title=' Parking space already in use. '" : "";

				slotsGroup += "		<label class='btn btn-primary  lblparkme "+isLoggedIn + usedDisable + iWantToPark +"' "+loginErrMsg + parkingActiveErr + inUseErr + " data-toggle='tooltip'>";
				slotsGroup += "			<input type='radio' id='chkparkme"+a+"' name='" + this.parkingName + "' value='"+a+"' autocomplete='off' "+isLoggedIn+" class='chkparkme'> Space No. "+a;
				slotsGroup += "		</label>";
				
			}
		slotsGroup += "	</div>";

		return Spacebars.SafeString(slotsGroup);
	},
});
Template.App_parkingAreas.events({

	'change .lblparkme input'(event){
		var slotNo = event.target.value;
		var isUsed = ParkingTrx.find({parkingAreaId: this._id, status: 'Active',slotNo: slotNo.toString()}).count();
		var myActiveParking	= ParkingTrx.find({status: 'Active', parkedBy: Meteor.userId()}).count();

		if(Meteor.userId() && isUsed === 0 && myActiveParking === 0){
			if(confirm("You have selected to park at " + this.parkingName + " at space no. " + slotNo + ". Please confirm." )){
				Meteor.call("saveTrx",this._id,this.rate,slotNo);
				$("#"+event.target.id).attr('disabled','disabled');
			}else{
				$(".lblparkme").removeClass('active');
				$("#"+event.target.id).attr('checked',false);
			}
		}
	},
});
