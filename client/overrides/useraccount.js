AccountsTemplates.addFields([
	{
		_id:'fullName',
		type:'text',
		displayName:'Fullname',
		required:true,
	},
	{
		_id:'contactNo',
	    type: 'tel',
	    displayName: "Contact No",
	    required: true,
	    func: function (number) {
	        if (Meteor.isServer){
	          if (isValidPhone(number))
	              return false; // meaning no error!
	          return true; // Validation error!
	        }
	    },
	    errStr: 'Invalid Contact number!',
	},
	{
		_id:'plateNo',
	    type: 'text',
	    displayName: "Plate No",
	    required: true,
	    minLength: 6,
	}
]);
Template.overrideAtPwdFormBtn.replaces('atPwdFormBtn');
Template.ovrAtTextInput.replaces('atTextInput');
Template.myAtSocial.replaces("atSocial");