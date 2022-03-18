import { app } from '../src/app'
import 'dotenv/config'

const   PORT            = process.env.PORT              || 3000,
        PROFILE_NAME    = process.env.PROFILE_NAME      || 'Meu IF',
        PROFILE_STATUS  = process.env.PROFILE_STATUS    || 'Plataforma Meu IF'

var server

app.initialize(PROFILE_NAME, PROFILE_STATUS).then(()=>{
    server = app.listen(PORT, ()=>{
        console.log(`App listening at ${PORT}.`);
    })
})

process.on('SIGINT', ()=>{
    server.close()
    console.log('App stopped.');
})