import nodeMailer from "nodemailer";
import config from "../config/config.js";

const sendEmail = async (options) => {
	try {
		const transporter = nodeMailer.createTransport({
			host: config.email.smtp.host,
			port: Number(config.email.smtp.port),
			auth: {
				user: config.email.smtp.username,
				pass: config.email.smtp.password,
			},
			secure: false,
		});

		const mailOptions = {
			from: "MT <no-reply@gmail.com>",
			to: options.email,
			subject: options.subject,
			text: options.message,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent: ", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Email could not be sent.");
	}
};

export { sendEmail };
