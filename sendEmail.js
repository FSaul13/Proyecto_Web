var express = require('express');
var app = express();
const nodeMailer = require('nodemailer');
var ip = require('ip');

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kurumakai123@gmail.com',
        pass: 'Kurumakai123#'
    }
});

app.listen(3010);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/send', (req,res) => {
    var correo = req.query.email;
    
    let mailOptions = {
        from: 'kurumakai123@gmail.com', // sender address
        to: 'luisust10@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: 'Hello,<br> Please Click on the link' + correo +'to verify your email.<br><a href="http://'+ ip.address() +'/comport">Click here to verify</a>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) 
        {
            console.log("fallo " + error);
        } else {
            console.log("Enviado: " + correo);
        }
    });
    res.send("Todo gud");
});