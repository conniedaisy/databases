var db = require('../db');

module.exports = {
  messages: {
    get: function (reqBody, res) {
      var roomName = reqBody.roomname || 'lobby';
      console.log('in the models.get.  request below');
      console.log(reqBody);

      db.getMessages.byRoom(roomName, function(rows) {
        // res.results = rows;
        console.log('in final callback');
        console.log(res);
        var sendObj = {results: rows};
        res.send(sendObj);
      });
    }, // a function which produces all the messages
      // this will likely be a get request containing user or ROOM information. /*if no room then assume lobby(default).*/
      //send in the roomname into db.roomNameStuff(same deal as above will RETURN a roomID)
      //do a message lookup on roomID
      //return the data from the messageLookup
    post: function (username, message, roomname) {
      db.checkUser(username, function () {
        db.setMessage(username, message, roomname);
      });
      // receive request data
        //we need to send username into db.usernameStuff(it will create a new username object if it doesnt exit and will RETURN a userID)
        //then send in the roomname into db.roomNameStuff(same deal as above will RETURN a roomID)
        //then we can safely send in the message.text, roomID, userID and have it saved in the database
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username) {
      //need to send username to database in a form that makes sense to the db
      db.checkUser(username);
    }
  }
};

