import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
// import helmet from "helmet";
import routeAuthor from './service/routes/routeAuthor.js';
import routeBlog from './service/routes/routeBlog.js';
import { sendMail } from './service/middelware/sendMail.js';
import {
    badRequestHandler,
    unauthorizedHandler,
    notFoundHandler,
    handleError
} from
    './service/middelware/errorHandlers.js';


// Inizializza la gestione dei file .env
config();
sendMail();
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
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(handleError);

app.get('/', (req, res) => {
    res.send('<h1>HELLO WOLRD</h1>');
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
// Avviamo la funzione per inizializzare server
initServer();
