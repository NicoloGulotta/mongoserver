import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import nodemailer from 'nodemailer';
// import helmet from "helmet";
import { routeAuthor } from './service/routes/routeAuthor.js';
import { routeBlog } from './service/routes/routeBlog.js'
import {
    badRequestHendler,
    notfoundHandler,
    unauthorizedHandler
} from './service/middelware/errorHandlers.js';
// Inizializza la gestione dei file .env
config();

// Crea una porta
const PORT = process.env.LOCAL_PORT;

// Crea il server
const app = express();

// Middleware per la sicurezza
// app.use(helmet());

// Middleware per il parsing del body delle richieste in JSON
app.use(express.json());
// Per gestire la condivisione delle risorse
app.use(cors());
app.use('/authors', routeAuthor);
app.use('/blogs', routeBlog);
app.use(badRequestHendler) // 400
app.use(unauthorizedHandler) // 401
app.use(notfoundHandler) // 404

app.get('/', (req, res) => {
    res.send('Ciao Mondo');
});

// Middleware globale per la gestione degli errori
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.status);
});

// Funzione per inizializzare il server
const initServer = async () => {
    try {
        // Aspettiamo di connetterci al database
        await mongoose.connect(process.env.MONGO_URL);

        // Connessi al database
        console.log("Connesso al database");

        // Avvia il server
        app.listen(PORT, () => {
            console.log(`Il nostro server sta ascoltando sulla porta ${PORT}`);
        });
    } catch (err) {
        console.error("Connessione al database fallita!", err);
    }
};
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
// Avviamo la funzione per inviare la mail
// sendMail();

// Avviamo la funzione per inizializzare server
initServer();
