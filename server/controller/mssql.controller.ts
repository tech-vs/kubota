import { Request, Response } from "express";
import { result } from "lodash";
import sql from "mssql";

const sqlConfig = {
  user: "kuet\\administrator",
  password: "keT2402D0main",
  database: "ADJ",
  server: "172.20.176.4",
  options: {
    encrypt: false,
  },
};

export const mssqlMaster = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from PSE_Ts_DataUpload`;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  res.json({
    message: "OK",
    result,
  });
};
