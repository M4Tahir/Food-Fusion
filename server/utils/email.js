import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
            secure: false
        });

        const mailOptions = {
            from: "MT <no-reply@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
};

export {sendEmail};
