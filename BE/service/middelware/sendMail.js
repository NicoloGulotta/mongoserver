import nodemailer from 'nodemailer';

export async function sendMail() {
    try {
        // Configure email transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        async function sendMail() {
            try {
                // Configure email transporter
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                // Email content
                const mailBody = `
      <h1>Ciao!</h1>
      <p>Questo è un messaggio di email di prova.</p>
    `;

                // Create email message object
                const message = {
                    from: '"Nicolò" <israel.stiedemann@ethereal.email>',
                    to: 'test@gmail.com',
                    subject: 'Test Email ',
                    html: mailBody,
                };

                // Send email with error handling
                const info = await transporter.sendMail(message);
                console.log(`Email sent: ${info.messageId}`);
            } catch (error) {
                console.error('Error sending email:', error.message);
            }
        }

        // Email content
        const mailBody = `
      <h1>Ciao!</h1>
      <p>Questo è un messaggio di email di prova.</p>
    `;

        // Create email message object
        const message = {
            from: '"Nicolò" <israel.stiedemann@ethereal.email>',
            to: 'test@gmail.com',
            subject: 'Test Email ',
            html: mailBody,
        };

        // Send email with error handling
        const info = await transporter.sendMail(message);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
}