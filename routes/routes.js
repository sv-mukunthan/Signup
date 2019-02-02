console.log("routes");

var action=require('../action/action.js');
var nodemailer = require('nodemailer');
// var fd = require('freshdesk-nodejs');
// var Freshdesk = new fd('https://mydomain.freshdesk.com', 'APIKEY');

var UIRoutes=function(app){
    this.app=app;
    this.actionInstance=new action(app);
};

module.exports=UIRoutes;

UIRoutes.prototype.init=function(){

  var self=this;
  var app=this.app;

	app.get('/sign',function(req,res){
		var request=req.query;
		console.log("req",request);

    	self.actionInstance.insert(request,function(error,response){

    		var mailAccountUser = 'svmukunthan97@gmail.com';
            var mailAccountPassword = 'mukunthan8597';

            var fromEmailAddress = mailAccountUser;
        	var toEmailAddress = request.email;

    		var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: mailAccountUser,
			    pass: mailAccountPassword
			  },
			  tls: { rejectUnauthorized: false }
			});


            var rand = function() {
                return Math.random().toString(36).substr(2); // remove `0.`
            };

            var token = function() {
                return rand() + rand(); // to make it longer
            };

            var finalToken = token();

            console.log("finaltoken",finalToken);
            var temporaryPassword1 ='33333333333';
            var temporaryPassword =request.name;
            

            var link = "http://localhost:8000/p/id="+temporaryPassword1 + '/name='+temporaryPassword
            var mailOptions = {
			  from: mailAccountUser,
			  to: toEmailAddress,
			  subject: 'Sending Email using Node.js',
			  text: 'That was easy!',

                html: '<p>Click <a href="'+ link +'">'+ finalToken + ' </a> to verify your account</p>'

            };



			transporter.sendMail(mailOptions, function(error, response){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ',response);
			  }
			});
			res.send(response);
    	});
	});

    

    app.get('/p/:id/:name',function(req,res){


    	self.actionInstance.find(function(error,response){

    	console.log('Email sent: ' + req.params.id);
        console.log('Email sent: ' + req.params.name);
        res.send("tagId is set to " + req.params.name+"Use the One time password to Login:"+response[0].urldynamic);
	});
    });



    app.get('/Login',function(req,res){

        var request=req.query;
        console.log(request);

    	self.actionInstance.find(function(error,response){
    		console.log(response);

            
            if(request.name==response[0].name && request.password==response[0].urldynamic){
            	res.send("Login successfully Please give your feedback on freshdesk");
            }
            else{
            	res.send("Please ENter UR valid username and password");
            	// res.render("feedback.ejs",{});
            }
		
	});
    });
};