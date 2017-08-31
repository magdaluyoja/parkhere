import { Template } from 'meteor/templating';
import { Parkings } from '/imports/api/parkings/parkings.js';
import { ParkingTrx } from '/imports/api/parkings/parkings.js';
import { Session } from 'meteor/session';

import './transactions.html';

Template.App_transactions.onCreated(function(){
	
	this.autorun(()=>{
		this.subscribe("myUser");
		this.subscribe("myParkings");
		this.subscribe("allParkingsAdmin");
	});
});

Template.App_transactions.helpers({
	'myParkingHistory'(){
		return ParkingTrx.find({}); 
	},
	'areaName'(){
		return Parkings.findOne({_id: this.parkingAreaId}); 
	},
	'durationTime'(){
		var minutes = getDiffInMin(this.unparkedAt ? this.unparkedAt : new Date(),this.parkedAt);

		return minutes; 
	},
	'totalAmount'(){

		var minutes = getDiffInMin(this.unparkedAt ? this.unparkedAt : new Date(),this.parkedAt);

		return minutes * this.rate; 
	},
	'isActive'(){
		return this.status === 'Active' ? true : false;; 
	},
	'payUnparkedAt'(){
		return (new Date).toLocaleString(); 
	},
});
Template.App_transactions.events({
	'click .btn-unpark'(){
		var parkingName =  Parkings.findOne({_id: this.parkingAreaId}); 
		$("#lblPayParkingName").html(parkingName.parkingName);
		$("#lblPaySlotNo").html(this.slotNo);
		$("#lblPayRate").html(this.rate);
		$("#lblPayParkedAt").html(this.parkedAt.toLocaleString());

		var minutes = getDiffInMin(new Date(),this.parkedAt);

  		$("#lblPayDuration").html(minutes);
		$("#lblPayAmount").html(minutes * this.rate);

		Session.set('parkingTrxId',this._id);
		Session.set('currentRate',this.rate);
		Session.set('currentParkedAt',this.parkedAt);
	},
	'click #btnsubmit-payment'(){
		var payment = $("input[name='opt-payment']:checked").val();
		if(payment){
			if(Meteor.userId()){
				var trxId	=	Session.get('parkingTrxId');
				var rate 	=	Session.get('currentRate');
				var parkedAt=	Session.get('currentParkedAt');
				var minutes = 	getDiffInMin(new Date(), parkedAt);
				var amount 	=	minutes * rate; 
				var unparkedAt = new Date();
				Meteor.call("savePayment",trxId,payment,minutes,amount,unparkedAt);
				$("#lblsuccess").text('Payment successful. Thank you!');
				$('#successModal').modal('show');
				$('#payParkModal').modal('hide');
			}
			$("#divErrorMsg").hide();
		}else{
			$("#lblerror").text('Please select payment method.');
			$("#divErrorMsg").show();
		}
	},
	'click #btnclose-payment'(){
		$("input[name='opt-payment']").prop('checked', false);
		$("#divErrorMsg").hide();
	}
});

var getDiffInMin = function(unparkedAt,parkedAt){
	var diff = ((unparkedAt.getTime()) - (parkedAt.getTime()));
	var minutes = Math.floor(diff / 60000);
	var seconds = ((diff % 60000) / 1000).toFixed(0);
	return minutes;
}
