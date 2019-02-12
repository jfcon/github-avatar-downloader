var request = require("request");
var secrets = require("./secrets.js");
var fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      Authorization: "token c564dc38e37f057b6849e326c9aff58ed560d392"
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var list = JSON.parse(result);
  for (i = 0; i < list.length; i++) {
    console.log(list[i].avatar_url);
  }
});
