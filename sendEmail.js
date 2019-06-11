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
    var nom1 = req.query.firstname;
    var nom2 = req.query.lastname;
    var u = req.query.user;
    
    let mailOptions = {
        from: 'kurumakai123@gmail.com', // sender address
        to: 'luisust10@gmail.com', // list of receivers
        subject: 'Confirma tu correo', // Subject line
        text: 'Hello world?', // plain text body
        html: 'Hola,<br> por favor da click en el siguiente link' + correo +' para verificar tu email.<br><a href="http://'+ ip.address() +'/comport/done.php?fn=' + nom1 + '&ln='+nom2 +'&u=' + u + '">Verificar</a>'
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