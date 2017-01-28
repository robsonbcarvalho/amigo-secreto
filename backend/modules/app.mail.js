'use strict'

const nodemailer = require('nodemailer');
const directConfig = {
    name: 'localhost',
    post: 25
}

module.exports = (mailData, cb) => {
	const transporter = nodemailer.createTransport(directConfig)

	transporter.sendMail(mailData, cb)
}