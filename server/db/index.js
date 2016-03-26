var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

//this will likely return the actual mysql queries, posts, etc to models

var connection = mysql.createConnection({
  user: 'root',
  password: 'ccgirl77',
  database: 'chat'
});

connection.connect();
var userID = -1;
var passUserID = function ( rows, value ) {
  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      queryString = 'INSERT INTO users (username) VALUES ("' + value + '");';
      //no username
      performQuery(queryString);
    } else {
      // return that userID
      console.log('found value and Id', value, rows[0].userID);
      userID = rows[0].userID;
      return userID;
    }
  }
};
// var queryString = 'SELECT * FROM wp_posts';
 
var performQuery = function (queryString, callback) {
  var userID = -1;
  // console.log('***************** running query');
  // console.log(queryString);
  connection.query(queryString, function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      if (callback) {
        callback(rows, fields);
      }
    }
  });
};

module.exports = {
  getMessages: {
    byRoom: function (roomname, callback) {
      console.log('attempting to serve responses');
      var queryString = 'select m.objectId, m.text, u.username, r.roomname from messages m inner join users u on (m.userID = u.userID) inner join rooms r on (m.roomID=r.roomID) where r.roomname="' + roomname + '";';
      performQuery(queryString, function(rows, fields) {
        console.log('Connie rocked it.... rows below *************');
        console.log(rows);
        // res.messageLog = rows;
        callback(rows);
      });
    }, // a function which produces all the messages
    byUser: function () {} // a function which can be used to insert a message into the database
  },
  setMessage: function (username, message, roomname) {

    var insertMessageString = 'INSERT INTO messages (text, roomID, userID) VALUES ("' + message + '", (SELECT roomID FROM rooms WHERE roomname = "' + roomname + '"), (SELECT userID FROM users WHERE userName = "' + username + '"));';
    var queryString = 'SELECT roomID FROM rooms where roomname=\'' + roomname + '\';';
    performQuery(queryString, function(rows, fields) {
      if (Array.isArray(rows)) {
        if (rows.length === 0) {
          // console.log('room not found *********************  inserting');
          queryString = 'INSERT INTO rooms (roomname) VALUES ("' + roomname + '");';

          performQuery(queryString, function() {
            console.log('in callback to perform insertMessageString');
            performQuery(insertMessageString);
          });
        } else {
          // console.log('room found.. attempting to add message insertMessageString' + insertMessageString);
          performQuery(insertMessageString);
        }
      }
    });

  },
  checkUser: function (username, callback) { 
    // console.log('made it into db layer :', username);

    var queryString = 'SELECT userID FROM users where userName=\'' + username + '\';';

    // var test = performQuery(queryString, username, passUserID);
    performQuery(queryString, function(rows, fields) {
      if (Array.isArray(rows)) {
        if (rows.length === 0) {
          queryString = 'INSERT INTO users (userName) VALUES ("' + username + '");';
          //no username
          performQuery(queryString, callback);
        } 
        if (callback) {
          callback();
        }
        // else {
        //   // return that userID
        //   console.log('found value and Id', value, rows[0].userID);
        //   var userID = rows[0].userID;
        //   return userID;
        // }
      }
    });
    // connection.end();
  },
  checkRoom: {
    //will check if room exists
      //if not, will create a new room
  }
};