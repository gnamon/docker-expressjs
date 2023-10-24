import { Application } from "express";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { serve, setup, SwaggerOptions } from "swagger-ui-express";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

// NOTE: class-transformer/storage currently have import issue
// REF: https://github.com/typestack/class-transformer/issues/563
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

interface SwaggerHandlerOptions {
  swagger: SwaggerOptions;
}

export function swaggerHandler(
  config: SwaggerHandlerOptions,
  server: Application
) {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: "#components/schemas",
  });

  const spec = routingControllersToSpec(
    getMetadataArgsStorage(),
    {
      routePrefix: config.swagger.prefix,
    },
    {
      components: {
        schemas,
        securitySchemes: {
          UserTokenAuth: {
            type: "apiKey",
            in: "header",
            name: "authorization",
          },
        },
      },
      security: [
        {
          UserTokenAuth: [],
        },
      ],
    }
  );

  server.use("/swagger", ...serve, setup(spec));
}
