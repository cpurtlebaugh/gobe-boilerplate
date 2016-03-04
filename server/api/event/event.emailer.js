'use strict';

var mongoose = require('mongoose');
var async = require('async');
var _     = require('lodash');
var Group = require('../group/group.model');
var nodemailer = require('nodemailer');
var GodaddyPassword = process.env.GODADDY_PASSWORD;
var GodaddySMTP = process.env.GODADDY_SMTP;
var GoogleAPIKey = process.env.GOOGLE_API_KEY;

function matchZipCode(event, host){
  
  async.waterfall([
	  function(done) {
	    Group.find({ zipCode: event.zipCode }, function(err, group) {
	      if (!group) {
	      	// console.log(err)
	        // return res.status(404).send('There are no zipcode matches.');
	      }
	       done(err, group);
	    });
	  },
	  function(group, done) {

	    group.map(function(value){

	    	var index = _.indexOf(event.sentEmails, value.email)

	    	var link = 'http://' + host + '/event/' + event._id + '/confirm/' + value._id;
	    	var capFirstName = _.capitalize(value.firstName);
	    	var mapLink = 'http://maps.googleapis.com/maps/api/staticmap?center=' + event.zipCode + '&zoom=14&size=800x300&markers=' + event.zipCode + '&key=' + GoogleAPIKey 

		    var transporter = nodemailer.createTransport({
		      host: GodaddySMTP,
		      port: 25,
		      auth: {
		        user: 'hello@gobethe1.com',
		        pass: GodaddyPassword
		      }
		    });

		    var mailOptions = {
		      to: value.email,
		      from: 'hello@gobethe1.com',
		      subject: 'Are You Available?',
		      html:  '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
		    '<td align="center">' +
		    '<img src=' + mapLink + '>' +
		    '<h5 style="font-size:16px;font-family:sans-serif;">Hello ' + capFirstName + ', we matched you with a move-in party of a homeless vet in your neighborhood!</h5>' +
		    '<h5 style="font-size:16px;font-family:sans-serif;">Check out the dates and times and let us know if you are available:</h5>' +
		    '<a href=' + link +  ' style="background-color:#0700FC;border:1px solid #0700FC ;border-radius:3px;color:#ffffff ;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">View Party Dates</a></td>' +
		    '</tr></table>'

		    };

			if(index === -1){
			    transporter.sendMail(mailOptions, function(err) {
			    	console.log("inside sendMail error")
			    	console.log(err)
			      // return res.status(200).send('An e-mail has been sent to ' + user.email + ' with further instructions.');
			    });
			}

		});

	    done('done');


	  },
	], function(err) {
	  if (err) return (err);
	});

}

module.exports.matchZipCode = matchZipCode;
