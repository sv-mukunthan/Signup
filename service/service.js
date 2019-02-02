console.log("service");

var service=function(app) {
this.app=app;
};

module.exports=service;

var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost/27017';

service.prototype.insert=function(reqobj,callback){
     
  var userrequest=reqobj;
  console.log("req object from client insert method",userrequest);

    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("mydb");
	    dbo.collection("employeedb").insertOne(userrequest, function(err, res) {
	      if (err) throw err;
	      console.log("1 document inserted");
	      db.close();
	      callback(err,res);
	    });
    });
};

service.prototype.FindOne=function(callback){

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("employeedb").find({}).sort({_id:-1}).limit(1).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("result"+result);
	    db.close();
	    callback(err,result);
	  });
	});
};