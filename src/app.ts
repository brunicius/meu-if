import { PrismaClient } from "@prisma/client";
import express, { Express, Router } from "express";

import Messenger from "./base/messenger";
import config from "./config.json";
import * as cron from "node-cron";

import routes from "./routes";

// Meu IF App Class
class App {
  private express: Express;
  private database: PrismaClient;
  private messengers: Messenger[];
  private currentMessenger: Messenger | undefined = undefined;

  private cron: cron.ScheduledTask | undefined;

  constructor(database: PrismaClient, messengers: Messenger[]) {
    this.express = express();
    this.database = database;
    this.messengers = messengers;

    this.setRouter(routes);
  }

  // Express middlewares
  public setMiddleware(middleware: () => void) {
    this.express.use(middleware);
  }

  // Express routers
  public setRouter(router: Router) {
    this.express.use(router);
  }

  public startCRON(): void {
    this.cron = cron.schedule(config.cron.time_pattern, () => {
      console.log("cron");
    });
  }

  public stopCRON(): void {
    if (this.cron) this.cron.stop();
  }

  // Express listen function
  public async listen(port: number, cb?: () => void): Promise<void> {
    this.database.$connect().then(() => {
      this.express.listen(port, cb);

      if (config.cron.autostart) this.startCRON();
    });
  }
}

export default App;

