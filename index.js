'use strict';

const expat = require('expat');
const childProcess = require('child_process');
const fileSizeParser = require('filesize-parser');

const mediaInfoPath = process.env.MEDIAINFO_PATH || 'mediainfo';

/**
 * @param {string[]} files
 * @returns {Promise}
 */
function mediaInfo (files) {
  const promise = new Promise((resolve, reject) => {
    childProcess.execFile(
      mediaInfoPath,
      ['--Output=XML'].concat(files),
      (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      }
    );
  });

  return promise.then(stdout => parse);
}

/**
 * @param stdout
 * @returns {Promise}
 */
function parse (stdout) {
  return new Promise((resolve, reject) => {
    const parser = new expat.Parser();
    const files = [];

    let file = null;
    let track = null;
    let key = null;

    parser.on('startElement', (name, attributes) => {
      name = name.toLowerCase();

      if (file === null && name === "file") {
        file = {tracks: []};

        for (var k in attribs) {
          file[k.toLowerCase()] = attribs[k];
        }

        return;
      }

      if (track === null && name === "track") {
        if (attributes.type === "General") {
          track = file;
        } else {
          track = {};

          for (var k in attributes) {
            track[k.toLowerCase()] = attribs[k];
          }
        }

        return;
      }

      if (track !== null) {
        key = name;
      }
    });

    parser.on("endElement", name => {
      name = name.toLowerCase();

      if (track !== null && name === "track") {
        if (track !== file) { file.tracks.push(track); }
        track = null;
      }

      if (file !== null && name === "file") {
        if (file.file_size) {
          file.file_size_bytes = fileSizeParser(file.file_size);
        }

        files.push(file);

        file = null;
      }

      key = null;
    });

    parser.on("text", text => {
      if (track !== null && key !== null) {
        track[key] = (track[key] || "") + text;
      }
    });

    if (parser.parse(stdout)) {
      resolve(files);
    } else {
      reject(parser.getError());
    }
  });
}

module.exports = mediaInfo;