import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import httpCodes from './assets/HttpCodes'
// WhatsApp module import
import WhatsApp from './controllers/Whatsapp'
// Routers import
import indexRoute from './routes'

class App {
    private express: express.Application;
    public messenger: WhatsApp;

    constructor () {
        this.express = express()

        this.setMiddlewares()
        this.setRoutes()

        this.messenger = new WhatsApp('MeuIF', 'Plataforma Meu IF')
    }

    private setMiddlewares () {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use(morgan('dev'))
    }
    private setRoutes() {
        this.express.use('/api', indexRoute)

        this.express.use(function (err, req, res, next) { // Error route
            console.error(err.message)
            res.status(httpCodes.SERVICE_UNAVAILABLE).json({
                error: err.message
            })
        })
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
