const path = require('path');
var PDFDocument = require('pdfkit');
var fs = require('fs');

var express = require("express");
var foo = require('./movie.json');
const fetch = require("node-fetch");

// Change following url if base64 require to fetch
// from other server.
const FETCH_BASE64_FROM = "http://localhost:5000/test";

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'))

app.get("/file", function (req, res, next) {
  fetch(FETCH_BASE64_FROM, {/*add headers here*/})
    .then(response => {
      return response.json();
    })
  .then(data => {
    let buff = new Buffer.from(data.data, 'base64');
    let text = buff.toString('ascii');
    let doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(path.resolve(__dirname, "./public/output.pdf")));
    doc.text(text, {
      width: 410,
      align: 'left'
    });
    doc.end();
    res.send({ 
      fileName: "output.pdf", 
      serverUrl:"http://localhost:5000"});
  });
});

app.get("/test", function (req, res, next) {
  res.send(foo);
});

app.listen(5000, () => console.log('Example app listening on port 5000!'))

