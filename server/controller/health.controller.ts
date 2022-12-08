import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */

export const index = async (req: Request, res: Response): Promise<void> => {
  res.json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
};