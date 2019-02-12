var request = require("request");
var secrets = require("./secrets.js");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];
console.log("Welcome to the GitHub Avatar Downloader!");
// console.log(owner, repo);

function getRepoContributors(owner, repo, cb) {
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
    headers: {
      "User-Agent": "request",
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
    .pipe(fs.createWriteStream("./avatars/" + filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  if (owner === undefined || repo === undefined) {
    console.log("Something went wrong!");
    throw err;
  } else {
    var list = JSON.parse(result);
    for (i = 0; i < list.length; i++) {
      avatarUrl = list[i].avatar_url;
      userName = list[i].login + ".jpg";
      // console.log(avatarUrl);
      downloadImageByURL(avatarUrl, userName);
    }
  }
});
