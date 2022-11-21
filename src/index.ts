import * as _c from "./util/console";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import App from "./app";

// Database
import db from "./database";
import router from "./routes";

// Messengers
import WhatsAppWeb from "./messengers/whatsapp-web";

dotenv.config(); // Configure enviroment variables

const main = async () => {
  _c.clear();
  _c.log("Initializing app...");

  _c.log("Starting WhatsAppWeb module...");
  const whatsAppWeb = new WhatsAppWeb();
  await whatsAppWeb.start(() => {
    _c.success("WhatsAppWeb module started.");
  });

  // Define entities
  const app = new App(db, [whatsAppWeb]);
  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    _c.success("App listening on " + port);
  });
};

main().catch((error) => {
  _c.error(error);
});

