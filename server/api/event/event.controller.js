'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var eventEmailer = require('../event/event.emailer');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  req.body.host = req.headers.host
  // mongoose.set('host', req.headers.host)
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    console.log('req body')
    console.log(req.body)
    if (err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    var updated = _.merge(event, req.body);
    updated.availability = req.body.availability;
    event.markModified('confirmedEmails');
    // console.log('updated');
    // console.log(updated.confirmedEmails);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      console.log('if evaluation')
      console.log((event.confirmGroup !== null) && (event.confirmedEmails.length === 0))
      if((event.confirmGroup !== null) && (event.confirmedEmails.length === 0)){
      eventEmailer.confirmGroup(event, req.headers.host);
      }
      console.log('outside if');
      console.log(updated.confirmedEmails);
      return res.status(200).json(event);
    });
      console.log('outside update');
      console.log(updated.confirmedEmails);
  });
};

// send out matching event to groups and save event
exports.send = function(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    console.log(event.confirmGroup)
    eventEmailer.matchZipCode(event, req.headers.host);
    return res.status(201).json(event);
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
