#!/usr/bin/env node

var util = require("util"),
    mediainfo = require("./server/mediainfo/mediainfo.js");

mediainfo("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", function(err, res) {
  if (err) {
    return console.log(err);
  }

  console.log(util.inspect(res, null, null, true));
});
