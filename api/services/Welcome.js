exports.sendWelcomeEmail = function(options) {
	var nodemailer = require('nodemailer');

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'vuongngo.pd@gmail.com',
	        pass: 'P2ngo14491992'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'vuongngo.pd@gmail.com', // sender address
	    to: 'vuongngo.pd@gmail.com', // list of receivers
	    subject: 'Welcome', // Subject line
	    text: 'Welcome', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
	// var opts = {"type":"messages","call":"send","message":
	//     {
	//         "subject": "Welcome!",
	//         "from_email": "vuongngo.pd@gmail.com",
	//         "from_name": "Vuong",
	//         "to":[
	//             {"email": options.email, "name": options.name}
	//         ],
	//         "text": "Dear "+options.name+",\nYou're in the Beta! Click http://localhost:1337/confirm" + options.id + "to verify your account"
	//     }
	// };

	// myEmailSendingLibrary.send(opts);
};