"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const middlewares_1 = require("./middlewares");
const loadable_1 = require("./loadable");
const typedi_1 = __importDefault(require("typedi"));
const _controllers = __importStar(require("./controllers"));
const PORT = process.env.PORT || 8000;
const config = typedi_1.default.get(loadable_1.Config);
const controllers = Object.values(_controllers)
    .filter((e) => e instanceof routing_controllers_1.Controller)
    .map((e) => e);
(0, routing_controllers_1.useContainer)(typedi_1.default);
(0, class_validator_1.useContainer)(typedi_1.default);
const server = (0, express_1.default)();
server.use((0, middlewares_1.healthz)(config));
(0, middlewares_1.swaggerHandler)(config, server);
(0, routing_controllers_1.useExpressServer)(server, {
    // cors: false,
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
