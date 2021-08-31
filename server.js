/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("./build"));

app.use('*/**', (req, res) => {
	res.redirect('/');
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, "0.0.0.0", function () {
	console.log(`Example app listening on port ${port}!`);
});