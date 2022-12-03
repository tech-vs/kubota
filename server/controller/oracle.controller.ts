import { Request, Response } from "express";
import oracledb from "oracledb";

export const mssqlMaster = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    oracledb.getConnection({
      user: "STDADMIN",
      password: "STDADMIN",
      connectString: "172.20.176.72/PRDACT",
    });
    console.log("Successfully connected to Oracle Database");
  } catch (error) {
    console.log(error);
  }
};
