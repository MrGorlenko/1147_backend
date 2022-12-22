const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res, next) => {
	res.send('mailer received');
});

router.post('/', async (req, res, next) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_SENDER,
			pass: process.env.PASSWORD,
		},
	});

	const messageText = `
    name: ${req.body.name}
    lastName: ${req.body.lastName}
    email: ${req.body.email}
    message: ${req.body.message}
  `;

	const messageTextHTML = `
  <b>name: </b> ${req.body.name}  <br/>
  <b> lastName: </b> ${req.body.lastName} <br/>
  <b> email: </b> ${req.body.email} <br/>
  <b> message: </b> ${req.body.message} <br/>
`;
	try {
		await transporter.sendMail({
			from: `"${process.env.NAME_SENDER} 👻" <${process.env.EMAIL_SENDER}>`,
			to: process.env.EMAIL_RECEIVER,
			subject: process.env.MESSAGE_SUBJECT,
			text: messageText,
			html: messageTextHTML,
		});
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
});

module.exports = router;
