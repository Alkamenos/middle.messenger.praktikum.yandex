const express = require('express');

const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static('./build'));

app.use('*/**', (req, res) => {
	res.redirect('/');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + './build/index.html');
});

app.listen(PORT, function() {
	console.log(`Example app listening on port ${PORT}!`);
});