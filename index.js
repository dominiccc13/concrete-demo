require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 3000;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/our-work', (req, res) => {
    res.sendFile(path.join(__dirname, 'our_work.html'));
});

app.post('/get-estimate', (req, res) => {
    const { name, email, number, address, city, desc, measurements} = req.body;
    const today = new Date();
    
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: 'Your Estimate Request',
        text: 'We will contact you within 2-3 business days regarding your estimate. Look out for an email or phone call.'
    }

    const estimateMailOptions = {
        from: process.env.APP_EMAIL,
        to: process.env.APP_EMAIL,
        subject: 'Estimate Requested',
        text: [name, email, number, address, city, desc, measurements] + `\nHas requested an estimate on ${today.toDateString()}.`
    }

    transporter.sendMail(estimateMailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: `An error occurred: ${error}` })
        }
        res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
    })
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: `An error occurred: ${error}` })
        }
        res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.listen(PORT, () => { console.log(`App listening on http://localhost:${PORT}`) });