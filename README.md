#motion-rest-server

##Introduction
This program serves a REST interface to the motion detection events
saved by Motion to a MyQSL database. *Motion* is an open source motion
detection software developed for Linux.

##Pre-requisites
* Motion should be configured to write to a MySQL or PostgreSQL DB.
* Node.js and NPM
* Bower

##Installation
To install motion start by executing the following commands

```
git clone https://github.com/scrussell24/motion-rest-server.git
cd motion-mysql-server
npm install
bower install
```

Edit the confin/config.js with your DB credentials Edit Motion's motion.conf file to write snapshots to this directory.

To run the server execute

```
bin/www
```

The server should be running on port 3000. Try navigating to localhost:3000 in your browser to test.

##Motion Event API
* GET	/security/	returns all records	Limited to newest 1,000 records. This can be configured in config.js.
* GET	/security/id	returns record by id
* POST	/security/	create new record
* PUT	/security/id	update record
* DELETE	/security/id	Delete record by id.

##License
The MIT License (MIT)

Copyright (c) 2014 Scott Russell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
