/*
  Warnings:

  - You are about to drop the `PSE_TS_DataUpload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PSE_TS_DataUpload";

-- CreateTable
CREATE TABLE "pse_ts_dataupload" (
    "id" SERIAL NOT NULL,
    "Prod_Seq" INTEGER NOT NULL,
    "Delivery_Date" TIMESTAMP(3) NOT NULL,
    "pallet" INTEGER NOT NULL,
    "skewer" INTEGER NOT NULL,

    CONSTRAINT "pse_ts_dataupload_pkey" PRIMARY KEY ("id")
);
