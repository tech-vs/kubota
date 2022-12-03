import { Request, Response } from "express";
import sql from "mssql";
import { Client } from "pg";

const pgClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "backend",
  password: "password",
  port: 5432,
});

export const mssqlMaster = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get Json from MSSQL
    await sql.connect(
      "Server=172.20.176.4,1433;Database=ADJ;User Id=kuet\\administrator;Password=keT2402D0main;Encrypt=false"
    );
    const result =
      await sql.query`select Delivery_Date,Prod_Seq,Pallet#,Skewer#  from PSE_Ts_DataUpload`;

    // Insert Json into PostgreSQL
    await pgClient.connect();
    const data = result.recordset.map((element) => {
      return `(${element.Delivery_Date},${element.Prod_Seq},${element["Pallet#"]},${element["Skewer#"]})`;
    });
    console.log(data.toString());

    const something = await pgClient.query(
      `INSERT INTO pse_ts_dataupload(delivery_date,prod_seq,pallet,skewer) VALUES ${data.toString()}`
    );
    // // const test = await pgClient.query(`SELECT * FROM pse_ts_dataupload`);
    // // console.log(test);
    pgClient.end();
    res.json({
      message: "OK",
      //   result: result.recordset,
    });
  } catch (error) {
    console.log(error);
  }
};
