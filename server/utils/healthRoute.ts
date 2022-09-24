import { Request, Response } from "express";

export const healthRoute = async (_: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = `${error}`;
    res.status(503).send();
  }
};
