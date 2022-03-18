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
        this.profileName = profileName
        this.profileStatus = profileStatus

        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: profileName ? profileName : 'session'
            }),
            puppeteer: {
                headless: false
            },
            //userAgent: 'Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 5.0; Trident/3.1)'
        })
        this.client.on('qr', qr=>{                                  // Write QR code to terminal
            console.log('Please read the QR code:');
            qrcode.generate(qr, {small: true})
        })
        this.client.on('auth_failure', message=>{                   // Write to terminal when auth fail
            console.log('auth_failure', message);
        })
        this.client.on('disconnected', message=>{                   // Write to terminal when disconnected
            console.log('disconnected', message);
        })
        this.client.on('ready', ()=>{                               // Write to terminal when module is ready
            this.ready = true
            console.log('WhatsApp module is now ready to use.');

            if (this.profileName)
                this.client.setDisplayName(this.profileName)
            if (this.profileStatus)
                this.client.setStatus(this.profileStatus)
        })
    }

    isReady() {
        return this.ready;
    }
    public async initialize() {
        await this.client.initialize()                                    // Initialize client
    }
    override getName(chatId: string): string {
        throw new Error('Not implemented')
    }
    override sendMessage(chatId: string, message): void {
        if (!this.isReady())
            throw new Error("Messenger is not ready.")

        app.messenger.client.sendMessage(chatId, message)

        console.log(
            `Message sent\n\n     From:   ${this.profileName || 'This session'}\n     To: ${chatId}\n     Body:   ${message}`
        );

    }
}

export default WhatsappMessenger