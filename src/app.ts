import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'
import * as morgan from 'morgan'


import httpCodes from './util/HttpCodes'        // HTTP Code List
import WhatsApp from './controllers/Whatsapp'   // WhatsApp module import
import router from './routes'               // Main route import
import database from './database'

class App {
    private express: express.Application;
    public messenger: WhatsApp;
    private appDir: String;

    constructor () {
        this.appDir = path.resolve(__dirname, '..', 'Views', 'build');
        this.express = express()

        this.setMiddlewares()
        this.setRoutes()
    }
    private setMiddlewares () {
        this.express.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.express.use(express.json({limit: '50mb'}))
        this.express.use(cors())
        this.express.use(morgan('dev'))
    }
    private setRoutes() {
        this.express.use('/api', router)                    // API route

        this.express.get('/*', (req, res) => res.sendFile('index.html', { root: this.appDir })) // React static server route

        this.express.use(function (err, req, res, next) {       // Error route
            console.error(err.message)
            res.status(httpCodes.SERVICE_UNAVAILABLE).json({
                error: err.message
            })
        })
    }
    private async connectDatabase() {
        await database.$connect()

        console.log('Database connected.');
    }
    public async initialize(): Promise<void> {
        await this.connectDatabase()

        this.messenger = new WhatsApp('MeuIF', 'Plataforma Meu IF')
        await this.messenger.initialize()
        return
    }
    public listen(port, callback: () => void) {
        return this.express.listen(port, callback)
    }
}

// Create App and WhatsApp instance
const  app = new App()

export {
    app
}
