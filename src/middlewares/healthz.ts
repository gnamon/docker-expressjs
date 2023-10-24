import { NextFunction, Request, Response } from "express";

type ServiceOptions = {
  name: string;
  version: string;
};

interface HealtzOptions {
  service: ServiceOptions;
}

export function healthz({ service }: HealtzOptions) {
  return function healthz(req: Request, res: Response, next: NextFunction) {
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
