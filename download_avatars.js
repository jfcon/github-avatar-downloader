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

getRepoContributors("jquery", "jquery", function(err, result) {
  var list = JSON.parse(result);
  for (i = 0; i < list.length; i++) {
    avatarUrl = list[i].avatar_url;
    userName = list[i].login + ".jpg";
    // console.log(avatarUrl);
    downloadImageByURL(avatarUrl, userName);
  }
});
