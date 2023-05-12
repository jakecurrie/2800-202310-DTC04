const nodemailer = require('nodemailer');

const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host:  process.env.PORT || 3001,
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'sjbd7788@gmail.com',
                pass: 'tqyycrhvavlcvmod'
            }
        })

        await transporter.sendMail({
            from: 'sjbd7788@gmail.com',
            to: email,
            subject: subject, 
            text: text,
        });

        console.log('email sent successfully');
    } catch (err) {
        console.log(err, "email not sent");
    }
}

module.exports = sendMail