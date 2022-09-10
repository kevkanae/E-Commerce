import { Request, Response } from "express";

export const defaultRoute = async (_: Request, res: Response) => {
  res.send("Welcome to XKart API");
};
