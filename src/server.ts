import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import personRoutes from './routes/Person';
import contractRoutes from './routes/Contract';
import serviceRoutes from './routes/Service';
const router = express();

//connect to mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to Mongo Atlas');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Failed to connect to Mongo Atlas: ');
        Logging.error(error);
    });

// Solamente levantar el sv si mongo conectó

const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //log the response
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Rules of api
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
        }
        next();
    });

    //Routes
    router.use('/persons', personRoutes);
    router.use('/services', serviceRoutes);
    router.use('/contracts', contractRoutes);
    //Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    //Error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server listening on port ${config.server.port}`));
};
