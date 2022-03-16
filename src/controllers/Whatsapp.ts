import Messenger from '../base/Messenger'
import { Client, LocalAuth } from 'whatsapp-web.js'
import * as qrcode from 'qrcode-terminal'
import { app } from '../app';

class WhatsappMessenger extends Messenger {
    protected profileName: string;
    protected profileStatus: string;
    protected client: Client;

    constructor(profileName?: string, profileStatus?:string) {
        super()

        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: profileName ? profileName : 'session'
            })
        })
        this.client.on('qr', qr=>{                                  // Write QR code to terminal
            console.log('Please read the QR code:');
            qrcode.generate(qr, {small: true})
        })
        this.client.on('ready', ()=>{                               // Write to terminal when module is ready
            this.ready = true
            console.log('WhatsApp module is now ready to use.');
        })
        this.client.initialize()                                    // Initialize client
    }

    isReady() {
        return this.ready;
    }
    override getName(chatId: string): string {
        throw new Error('Not implemented')
    }
    override sendMessage(chatId: string, message): void {
        if (!this.isReady())
            throw new Error("Messenger is not ready.")

        app.messenger.client.sendMessage(chatId, message)
    }
}

export default WhatsappMessenger