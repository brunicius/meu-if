import { app } from '../src/app'

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, ()=>{
    console.log(`App listening at ${PORT}.`);
})

process.on('SIGINT', ()=>{
    server.close()
    console.log('App stopped.');
})