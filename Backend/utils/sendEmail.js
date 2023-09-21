const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({


        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        auth: {
            user: 'ashishadarsh319@gmail.com',
            pass: 'abc123',
        },
    });

    const mailOptions = {
        from: 'ashishadarsh319@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;