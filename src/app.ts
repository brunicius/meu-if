import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'

import httpCodes from './util/HttpCodes'        // HTTP Code List
import WhatsApp from './controllers/Whatsapp'   // WhatsApp module import
import router from './routes'               // Main route import
import database from './database'
import auth from './middlewares/authentication'

class App {
    private express: express.Application;
    public messenger: WhatsApp;
    private appDir: string;

    constructor() {
        this.appDir = path.resolve(__dirname, '..', 'Views', 'build');
        this.express = express()

        this.express.disable('x-powered-by')
        this.setMiddlewares()
        this.setRoutes()
    }
    private setMiddlewares() {
        this.express.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.express.use(express.json({ limit: '50mb' }))
        this.express.use(cors())
        this.express.use(morgan('dev'))
    }
    private setRoutes() {
        this.express.use('/', express.static(this.appDir))
        this.express.use('/api', router)                    // API route


        this.express.use(function(req, res, next) {
            res.status(httpCodes.NOT_FOUND).json({
                error: "This route does not exist."
            })
        });
        this.express.use(function (err, req, res, next) {       // Error route
            if (err) {
                console.error(err.message)
                res.status(httpCodes.SERVICE_UNAVAILABLE).json({
                    error: err.message
                })
                next()
            }
        })
    }
    private async connectDatabase() {
        await database.$connect()

        console.log('Database connected.');
    }
    public async initialize(profileName: string, profileStatus: string, sessionName?: string): Promise<void> {
        await this.connectDatabase()

        this.messenger = new WhatsApp(profileName, profileStatus, sessionName)
        if (process.env.DISABLE_WHATSAPP!='true')
            await this.messenger.initialize()
        else
            console.log('WhatsApp module disabled');

        return
    }
    public listen(port, callback: () => void) {
        return this.express.listen(port, callback)
    }
}

// Create App and WhatsApp instance
const app = new App()

export {
    app
}
