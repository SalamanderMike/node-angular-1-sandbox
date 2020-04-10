const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())

// Functions
function ejsIncludePath (indexPath, information) {
	ejs.renderFile(indexPath, function (err, html) {
		if (err) {
			console.log('ERROR: ' + err)
			return false
		}
		fs.writeFile(path.join(__dirname, '/views/index.ejs'), html, function (err) {
			if (err) {
				console.log(err)
				return false
			}
			return true
		})
	})
};
ejsIncludePath(path.join(__dirname, '/views/includes/index-hub.ejs'))

// Setup
app.set('view engine', 'ejs')
app.use('/dist', express.static(path.join(__dirname, '/dist')))
app.use('/public', express.static(path.join(__dirname, '/dist/public')))

// ROUTES
app.get('/*', function (req, res) {
	res.render('index')
})

// NODEMON **************************************
app.listen(process.env.PORT || 3000, function () {
	console.log('THE AUDIENCE IS LISTENING... localhost:3000: ' + process.env.NODE_ENV)
})

// EXPORT ***************************************
module.exports = app
