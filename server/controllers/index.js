var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('stepping into models.mess.get');
      models.messages.get(req.body, res);
      // this is the callback used in routes.js by the router.get function
      // res.send('Hello! In messages: get within controllers');
      // console.log(req, res);
      //the req.room will be the only data we need to pass to models.get(roomNAME)
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('in messages post request');
      // console.log(req);
      models.messages.post(req.body.username, req.body.message, req.body.roomname);
      res.send();
      
    } // a function which handles posting a message to the database
      //a request has come in and we have .text .username and .room
        //we send req data to model
      //res.send();
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      //username is in req
      // console.log('req is: ');
      // console.log(req.body.username);
      models.users.post(req.body.username);
      res.send();
    }
  }
};

