'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

var EventSchema = new Schema({
  createdAt: {type: Date, default: Date.now()},
  updatedAt: Date,
  published: Boolean,
  userId: {type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
        },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  zipCode: String,
  gender: String,
  age: Number,
  causeType: String,
  veteran: Boolean,
  availability: {
    moveInDate: Date,
    firstDate: Date,
    firstDateTime: Array,
    secondDate: Date,
    secondDateTime: Array,
    thirdDate: Date,
    thirdDateTime: Array
  },
  registryUrl: String,
  notes: String,
  host: String,
  confirmGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', default:null},
  confirmDate: Date,
  confirmTime: String,
  // sentEmails: Array,
  confirmedEmails: Array,
  rejectedEmails: Array
});


EventSchema
 .pre('save', function(next) {
 this.updatedAt = new Date();
 next()
})

module.exports = mongoose.model('Event', EventSchema);
