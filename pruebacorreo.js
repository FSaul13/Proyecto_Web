const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'armandosc14@gmail.com',
        pass: 'Elefante360'
    }
});

let mailOptions = {
    from: 'armandosc14@gmail.com',
    to: 'masvaleuncochequelaamistad@hotmail.com',
    subject: 'Test',
    text: 'Hello World!',
    html:'<p>Probando</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});