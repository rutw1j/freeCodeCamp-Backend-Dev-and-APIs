let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// let dotenv = require('dotenv');


/* challenge-1 */
// console.log("Hello World");
/* challenge-1 */


/* challenge-2 */
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });
/* challenge-2 */


/* challenge-4 */
app.use("/public", express.static(__dirname + "/public"));
/* challenge-4 */


/* challenge-7 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
/* challenge-7 */


/* challenge-8 */
app.use(bodyParser.urlencoded({ "extended": false }));
/* challenge-8 */


/* challenge-3 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
/* challenge-3 */


/* challenge-5 */
// app.get("/json", (req, res) => {
//   res.json({ "message": "Hello json" });
// });
/* challenge-5 */


/* challenge-6 */
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({ "message": "Hello json" });
  }
});
/* challenge-6 */


/* challenge-8 */
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ "time": req.time });
}
);
/* challenge-8 */


/* challenge-9 */
app.get("/:word/echo", (req, res) => {
  res.json({ "echo": req.params.word });
});
/* challenge-9 */


/* challenge-10 */
app.get("/name", (req, res) => {
  res.json({ "name": req.query.first + " " + req.query.last });
});
/* challenge-10 */


/* challenge-11 */
app.post("/name", (req, res) => {
  res.json({ "name": req.body.first + " " + req.body.last });
});
/* challenge-11 */


module.exports = app;