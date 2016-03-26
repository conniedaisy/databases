CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  roomId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  roomName VARCHAR(40)
);

CREATE TABLE users (
  userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(40)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(255),
  roomId INT NOT NULL,
  userId INT NOT NULL,
  time DATETIME,
  -- PRIMARY KEY (id),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (roomID) REFERENCES rooms(roomID)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

