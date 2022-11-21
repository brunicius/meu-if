import { Buttons, Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import Messenger from "../../base/messenger";

import * as _c from "../../util/console";

import config from "../config.json";

class WhatsAppWeb extends Messenger {
  private client: Client;

  constructor(sessionName: string = "session") {
    super();

    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.client.on("qr", (token) => {
      _c.warn("Unauthenticated. Please scan the qr code on the device.");
      qrcode.generate(token, { small: true });
    });

    this.client.on("message", (msg) => {
      let button = new Buttons("Body", [
        {
          body: "Button 1",
        },
        {
          body: "Button 2",
        },
        {
          body: "Button 3",
        },
      ]);

      this.client.sendMessage(msg.from, "E aí");
    });
  }

  public isReady(): boolean {
    return this.ready;
  }

  public async sendMessage(
    destination: string,
    message: string,
  ): Promise<boolean> {
    if (!this.ready) return false;

    try {
      this.client.sendMessage(destination, message);
    } catch {
      return false;
    }

    return true;
  }

  public async start(cb?: () => void): Promise<void> {
    await this.client.initialize();
    this.ready = true;
    if (cb) cb();
  }
}

export default WhatsAppWeb;

