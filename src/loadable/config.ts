import { SwaggerOptions } from "swagger-ui-express";
import { Service } from "typedi";

type ApiOptions = {
  prefix: string;
  apiKey?: string;
};

type ServiceOptions = {
  name: string;
  version: string;
};

@Service()
export class Config {
  get api(): ApiOptions {
    return {
      prefix: process.env.API_PREFIX || "/api",
      apiKey: process.env.API_KEY || "",
    };
  }

  get service(): ServiceOptions {
    return {
      name: process.env.SERVICE_NAME || "zofair-admin-web-api",
      version: process.env.SERVICE_VERSION || "1.0.0",
    };
  }

  get swagger(): SwaggerOptions {
    return {
      prefix: this.api.prefix,
    };
  }
}
