import jwt from 'jsonwebtoken';
import User from '../models/modelUser.js';

//Funzione per generare il token
export const generatJWT = (payload) => {
    //restituisco una promise
    return Promise((resolve, reject) => {
        jwt.sign(payload,
            process.env.JWT_SECRET,
            //esprimo scadenza token
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

// Funzione per verificare il token
export const verifyJWT = (token) => {
    //verifico token tramite funzione verify
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            reject(err);
        } else {
            resolve(decoded);
        }
    });
};
//middelware da utilizzare nelle richieste con token necessario
export const authMiddleware = async (req, res, next) => {
    try {
        //verifico la presenza del token
        if (!req.headers.authorization) {
            res.status(400).send("Effettua il login")
        } else {
            const decoded = await verifyJWT(
                req.headers.authorization.repalce("Bearer ", "")
            );
            //verifico esistenza token ed elimino dal risultato "issued at" e "expiration"
            if (decoded.exp) {
                delete decoded.exp;
                delete decoded.iat;
                // recupero i dati di un utente dal database
                const me = await User.findOne({
                    ...decoded,
                });
                if (me) {
                    req.user = me;
                    next()
                } else {
                    res.status(401).send("Rieffettua il login";)
                }
            }
        }
    } catch (err) {
        next(err);
    }
};
