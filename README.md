Mediainfo
=========

Wrapper around the `mediainfo` command for obtaining information about media
files.
Exposed as API to supply info of urls

Overview
--------

This module provides an interface to the `mediainfo` command. It returns the
(parsed) output of the command with all the keys lower-cased. There's not a lot
to say here.
I have extended it to be a web service providing info of url's

Usage
-----

Once deployed you can pass url to the /info endpoint like this:

http://localhost:8080/info?url=http://myfile.mp4

response would be a json with info of that mp4

Example
-------

http://localhost:8080/info?url=http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4

Requirements
------------

The `mediainfo` command has to be available somewhere in the PATH of the user
node is running as.

License
-------

For media-info wrapper:
3-clause BSD. A copy is included with the source.

Contact
-------

* Email ([adylevy@gmail.com](mailto:adylevy@gmail.com))
