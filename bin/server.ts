import { app } from '../src/app'
import 'dotenv/config'

const PORT = process.env.PORT || 3000
var server

app.initialize().then(()=>{
    server = app.listen(PORT, ()=>{
        console.log(`App listening at ${PORT}.`);
    })
})

process.on('SIGINT', ()=>{
    server.close()
    console.log('App stopped.');
})