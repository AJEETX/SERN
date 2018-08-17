//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
	//Enabling CORS 
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
	next();
});

//Setting up server
var server = app.listen(process.env.PORT || 5300, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
	user: "ajeet",
	password: "P@ssw0rd",
	server: "localhost\\SQLEXPRESS",
	database: "PTEST"
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, data) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					res.send(data);
				}
			});
		}
	});
}

app.get("/api/users", function (req, res) {
	var query = "select * from [tblNode] order by ID";
	executeQuery(res, query);
});

//POST API
app.post("/api/users", function (req, res) {
	console.log(req.body);
	var query = "INSERT INTO [tblNode] (ID,Name,Detail) VALUES ('" + req.body.ID + "','" + req.body.Name + "','" + req.body.Detail + "')";
	executeQuery(res, query);
});

//PUT API
app.put("/api/users/:id", function (req, res) {
	console.log(req.params.id);
	var query = "UPDATE [tblNode] SET Name= '" + req.body.Name + "' , Detail=  '" + req.body.Detail + "'  WHERE ID= " + req.params.id;
	executeQuery(res, query);
});

// DELETE API
app.delete("/api/users/:id", function (req, res) {
	console.log(req.body);
	var query = "DELETE FROM [tblNode] WHERE ID=" + req.params.id;
	executeQuery(res, query);
});
