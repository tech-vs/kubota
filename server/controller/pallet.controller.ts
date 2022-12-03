import { Request, Response } from "express";
import { prisma } from "../app";
/**
 * GET /
 * Home page.
 */
type palletBody = {
  palletNo: string;
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
  status: string;
};
export const pallet = async (req: Request, res: Response): Promise<void> => {
  let result = await prisma.pallet.findMany();
  res.json(result);
};

export const checksheet = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.query.questionID) {
    let result = await prisma.questionItems.findMany({
      where: {
        questionListID: parseInt(req.query.questionID as string),
      },
    });

    res.json(result);
  }
};

export const editQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("test-log");

  if (req.body.id) {
    let result = await prisma.questionItems.update({
      where: {
        id: req.body.id,
      },
      data: {
        questionStatus: req.body.questionStatus,
      },
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
    );
    res.json({ message: "ok" });
  }
};
