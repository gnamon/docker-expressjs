import "reflect-metadata";
import express from "express";
import {
  useExpressServer,
  useContainer as routingUseContainer,
  Action,
  HttpError,
  Controller,
} from "routing-controllers"
import { useContainer as classValidatorUseContainer } from "class-validator";
import { swaggerHandler, healthz } from "./middlewares";
import { Config } from "./loadable";
import Container from "typedi";
import * as _controllers from "./controllers";

const PORT = process.env.PORT || 8000;

const config = Container.get(Config);

const controllers = Object.values(_controllers)
  .filter((e) => e instanceof Controller)
  .map((e) => e as unknown as typeof Controller);

routingUseContainer(Container);
classValidatorUseContainer(Container);

const server = express();

server.use(healthz(config));
swaggerHandler(config, server);
useExpressServer(server, {
  cors: false,
  // authorizationChecker: async (action: Action, roles: string[]) => {
  //   const authorization = action.request.headers["authorization"];

  //   if (!authorization) return false;

  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(authorization);
  //     if (decodedToken.uid == null) {
  //       return false;
  //     }
  //     return true;
  //   } catch (err) {
  //     throw new HttpError(404, "can not get userId");
  //   }
  // },
  routePrefix: config.api.prefix,
  controllers, // we specify controllers we want to use
});

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});