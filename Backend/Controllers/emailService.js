const Resend = require('resend').Resend; // Import Resend class explicitly
const key= process.env.SEND_KEY;

const resend = new Resend(key); // Replace with your Resend API key

// Function to send email
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'pyro@resend.dev', // Replace with your email
            to: [to],
            subject: subject,
            html: htmlContent
        });

        if (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending email");
        }
        
        console.log("Email sent successfully:", data);
        return data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};

module.exports = {
    sendEmail
};
