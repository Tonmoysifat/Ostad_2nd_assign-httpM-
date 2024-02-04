const http = require("http");
const fs = require("fs");
const multer = require("multer");
const port = 5500;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("myFile");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(" <h1>This is Home Page</h1>");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(" <h1>This is About Page</h1>");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(" <h1>This is Contact Page</h1>");
    res.end();
  } else if (req.url === "/file-write") {
    fs.writeFile("demo.txt", "hello world", (err) => {
      if (err) {
        res.end("Something is wrong. File is not created");
      } else {
        res.end("File created successfully");
      }
    });
  } else if (req.url === "/file-upload" && req.method === "POST") {
    upload(req, res, (err) => {
      if (err) {
        return res.end("Error uploading file");
      }
      res.end("File uploaded successfully");
    });
  } else {
    res.end();
  }
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
