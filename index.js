var fs = require("fs");
var http = require("http");

http
  .createServer((req, res) => {
    //Append Url to specified txt file or create a new file if it does not exist.
    fs.appendFile("RequestLogs.txt", req.url + " ", function (err) {
      if (err) throw err;
      console.log("Request Logged.");
    });
    //Redirect to home if no path is given.
    if (req.url === "/") {
      res.writeHead(302, {
        location: "http://localhost:8080/home",
      });
    }
    //Check if request url matches our specific urls, defaults to 404 if none exists.
    switch (req.url) {
      case "/home":
        res.write("Ana Sayfa");
        break;
      case "/about":
        res.write("Hakkımızda");
        break;
      case "/contact":
        res.write("Iletişim");
        break;
      default:
        res.statusCode = 404;
        res.write("404 Page Not Found");
        break;
    }
    res.end();
  })
  .listen(8080, () => {
    console.log("Listening on port: 8080");
  });
