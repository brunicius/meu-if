import Messenger from '../base/Messenger'
import { Client, LocalAuth } from 'whatsapp-web.js'
import * as qrcode from 'qrcode-terminal'
import { app } from '../app';

class WhatsappMessenger extends Messenger {
    protected profileName: string;
    protected profileStatus: string;
    protected client: Client;
    protected sessionName: string;

    constructor(profileName?: string, profileStatus?:string, sessionName?: string) {
        super()
        this.profileName    = profileName   || 'Profile name'
        this.profileStatus  = profileStatus || 'Profile status'  
        this.sessionName    = sessionName   || 'session'

        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: this.validateSessionName(this.sessionName)
            }),
            puppeteer: {
                headless: false
            }            
        })
        this.client.on('qr', qr=>{                                  // Write QR code to terminal
            console.log('Please read the QR code to session: ' + this.sessionName);
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

    validateSessionName(sessionName: string): string {
        let regex = /[ ]/gm
        if (regex.test(sessionName))
            return sessionName.replace(regex,'')

        return sessionName
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