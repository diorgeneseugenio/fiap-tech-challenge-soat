import { json, urlencoded } from "body-parser";
import { Express, NextFunction, Request, Response, Router } from "express";
import { CustomError } from "handlerError/handlerError";
import morgan from "morgan";

// import { DataBaseConfigInterface } from "adapter/driven/infra/config/interfaces/db.config.interface";
import {
  ServerConstructorInterface,
  ServerInterface,
} from "./interfaces/server.config.interface";

export class Server implements ServerInterface {
  appConfig: Express;
  // dataBaseConfig: DataBaseConfigInterface;

  routers: Array<{ [routeBase: string]: Router }>;

  port = Number(process.env.PORT) || 3000;

  // constructor({ dataBaseConfig, appConfig }: ServerConstructorInterface) {
  constructor({ appConfig }: ServerConstructorInterface) {
    this.appConfig = appConfig;
    // this.dataBaseConfig = dataBaseConfig;
    this.routers = [];
  }

  addRouter(routeBase: string, router: Router): void {
    this.routers.push({ [routeBase]: router });
  }

  async init(): Promise<void> {
    try {
      if (process.env.NODE_ENV === "development")
        this.appConfig.use(morgan("dev"));

      this.appConfig.use(json());
      this.appConfig.use(urlencoded({ extended: true }));

      this.appConfig.get("/api/health", (req: Request, res: Response) => {
        res.status(200).json({
          status: "success",
          message: "Ok!",
        });
      });

      for (const route of this.routers) {
        const routeBase = Object.keys(route)[0];
        this.appConfig.use(routeBase, route[routeBase]);
      }

      this.appConfig.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        if (err.code === 'NO_PERMISSION') {
          return res.status(401).json({
            error: {
              message: err.message,
            }
          });
        }

        if (err.code === 'NOT_FOUND') {
          return res.status(404).json({
            error: {
              message: err.message,
            }
          });
        }

        return res.status(500).json({
          error: {
            message: err.message,
          }
        })
      });

      this.appConfig.all("*", (req: Request, res: Response) => {
        res.status(404).json({
          status: "fail",
          message: `Route: ${req.originalUrl} does not exist on this server`,
        });
      });

      this.appConfig.listen(this.port, async () => {
        console.log(`🚀: Server is running at http://localhost:${this.port}`);
        // await this.dataBaseConfig.authenticate();
        // this.dataBaseConfig
        //   .getInstance()
        //   .sync({ force: false })
        //   .then(() => {
        //     console.log("✅: Synced database successfully.");
        //   })
        //   .catch((err: any) => {
        //     console.error("❌: Error on sync database.", err);
        //   });
      });
    } catch (err: any) {
      console.error("🚨: Unable to init the server:", err);
    }
  }
}
