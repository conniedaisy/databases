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
 
 
var queryString = 'SELECT * FROM wp_posts';
 
var performQuery = function (queryString, value) {
  return connection.query(queryString, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    console.log('toben is awesome because no justification needed');
    if (rows.length === 0) {
      queryString = 'INSERT INTO users (userName) VALUES ("' + value + '");';
      //no username
      performQuery(queryString);
    } else {
      // return that userID
      console.log('found value and Id', value, rows[0].userID);
      return rows[0].userID;
    }
  });
};
 


// dbConnection.query(queryString, queryArgs, function(err, results) {
//   // Should have one result:

//   // TODO: If you don't have a column named text, change this test.
//   // expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

// });


module.exports = {
  getMessages: {
    byRoom: function () {}, // a function which produces all the messages
    byUser: function () {} // a function which can be used to insert a message into the database
  },
  setMessage: function () {
    //will create a new message.  will need message, username, and room
  },
  checkUser: function (username) {
    var userID;
    console.log('made it into db layer :', username);

    connection.connect();

    // var username = 'toben';

    var queryString = 'SELECT userID FROM users where userName=\'' + username + '\'';
    // var queryArgs = [];

    return performQuery(queryString, username);
    // connection.query(queryString, function(err, rows, fields) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log('toben is awesome because no justification needed');
    //   if (rows.length === 0) {
    //     queryString = 'INSERT INTO users (userName) VALUES ("' + username + '");';
    //     //no username
    //   } else {
    //     // return that userID
    //     return rows[0].userID;
    //   }
    //   // for (var i in rows) {
    //   //   console.log('Returned from DB? rows and fields ', rows[i].userID, fields[0].name);
    //   // }
    //   //insert into users (userName) values ('connie');

    // });

    
    // dbConnection.query(queryString, queryArgs, function(err, results) {});

    //will check if user exists
      //if not, will create a new user in the user table
    // return userID;

    connection.end();
  },
  checkRoom: {
    //will check if room exists
      //if not, will create a new room
  }
};