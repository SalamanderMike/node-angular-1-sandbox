var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	ejs = require('ejs'),
	fs = require('fs'),
	app = express();


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Functions
function ejsIncludePath(indexPath, information) {
	ejs.renderFile(indexPath, function (err, html) {
		if (err) {
			console.log("ERROR: " + err);
			return false;
		}
		fs.writeFile(__dirname + '/views/index.ejs', html, function (err) {
			if (err) {
				console.log(err);
				return false
			}
			return true;
		});
	})
}
ejsIncludePath(__dirname + '/views/includes/index.ejs');

// Setup
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/dist/public')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));


// ROUTES
app.get('*', function (req, res) {
	res.render('index');
});



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("THE AUDIENCE IS LISTENING... localhost:3000: " + process.env.NODE_ENV);
});


// EXPORT ***************************************
module.exports = app;
