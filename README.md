#motion-rest-server

##Introduction
This program serves a simple web api to the motion detection events
saved by Motion to a MyQSL database. *Motion* is an open source motion
detection software developed for Linux. It can also be configured to write to a PostgreSQL database as well but this server currently only supports MySQL.

##Pre-requisites
* Motion should be configured to write to a MySQL database
* Node.js and NPM
* Bower (for front end dependencies)

##Installation
To install motion start by executing the following commands

```
git clone https://github.com/scrussell24/motion-mysql-server.git
cd motion-mysql-server
npm install
bower install
```

Edit the config.js with your MySQL credentials and the full path to your the public directory the images are stored in (this is needed because Motion will store the full path and the server removes this before sending to the client). Also, edit Motion's motion.conf file to write snapshots to this directory.

```
module.exports = {
 LIMIT: 1000,
 PATH_TO_PUBLIC_FOLDER: '/motion-mysql-server/public/',
 ALLOW_FULL_DELETE: false,
 mySQLHost : 'localhost',
 mySQLPassword : 'password',
 mySQLUser : 'root',
 dbName : 'motion'
};
```

The following CREATE TABLE query should be compatible with Motions's default insert query and motion-mysql-server.

```
CREATE TABLE `security` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `camera` int(11) DEFAULT NULL,
 `filename` varchar(256) DEFAULT NULL,
 `frame` int(11) DEFAULT NULL,
 `file_type` int(11) DEFAULT NULL,
 `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `text_event` varchar(256) DEFAULT NULL,
 PRIMARY KEY (`id`)
);
```

To run the server execute

```
bin/www
```

The server should be running on port 3000. Try navigating to localhost:3000 in your browser to test.

##Motion Event API
* GET	/motion/	returns all records	Limited to newest 1,000 records. This can be configured in config.js.
* GET	/motion/id	returns record by id
* POST	/motion/	create new record
* PUT	/motion/id	update record
* DELETE	/motion/	Delete all records.	This is disabled by default. Enable in config.js.
* DELETE	/motion/id	Delete record by id.

##License
The MIT License (MIT)

Copyright (c) 2014 Scott Russell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
