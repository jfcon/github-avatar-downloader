var request = require("request");
var secrets = require("./secrets.js");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];
console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(owner, repo, cb) {
  // GET call
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
    headers: {
      "User-Agent": "request",
      // my auth token goes here
      Authorization: "token c564dc38e37f057b6849e326c9aff58ed560d392"
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request(url)
    .on("error", function(err) {
      throw err;
    })
    .on("response", function(response) {
      console.log("Response Status Code: ", response.statusCode);
    })
    // pipes specified image to a folder
    .pipe(fs.createWriteStream("./avatars/" + filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  // error throw if command line is left blank
  if (owner === undefined || repo === undefined) {
    console.log("Something went wrong! You're missing an Owner, a Repo, or both!");
    throw err;
  } else {
    // goes through data chunk and....
    var list = JSON.parse(result);
    for (i = 0; i < list.length; i++) {
      //logs corresponding names and avatar URLs
      avatarUrl = list[i].avatar_url;
      userName = list[i].login + ".jpg";
      // sends both params to the download function
      downloadImageByURL(avatarUrl, userName);
    }
  }
});
