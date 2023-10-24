"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = require("swagger-ui-express");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
// NOTE: class-transformer/storage currently have import issue
// REF: https://github.com/typestack/class-transformer/issues/563
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
function swaggerHandler(config, server) {
    const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
        classTransformerMetadataStorage: defaultMetadataStorage,
        refPointerPrefix: "#components/schemas",
    });
    const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)((0, routing_controllers_1.getMetadataArgsStorage)(), {
        routePrefix: config.swagger.prefix,
    }, {
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
    });
    server.use("/swagger", ...swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(spec));
}
exports.swaggerHandler = swaggerHandler;
