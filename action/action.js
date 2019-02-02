console.log("action");

// var async = require('async');
var service=require('../service/service.js');

var action=function(app) {
   this.app=app;
   this.apiserviceInstance=new service(app);
};
module.exports=action;

action.prototype.insert=function(request,callback){

    var reqobj=request;
    
    console.log('insert request object',reqobj);

    var self=this;
   
    self.apiserviceInstance.insert(reqobj,function(error,response){

	    callback(error,response);

    });
};

action.prototype.find=function(callback){

    var self=this;
   
    self.apiserviceInstance.FindOne(function(error,response){



        callback(error,response);

    });
};

