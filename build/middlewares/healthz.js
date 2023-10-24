"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthz = void 0;
function healthz({ service }) {
    return function healthz(req, res, next) {
        if (req.path === `/healthz`) {
            return res.status(200).json({
                code: 200,
                message: "success",
                data: {
                    service,
                },
            });
        }
        return next();
    };
}
exports.healthz = healthz;
