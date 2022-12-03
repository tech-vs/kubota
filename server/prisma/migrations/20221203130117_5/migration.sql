/*
  Warnings:

  - You are about to drop the column `Delivery_Date` on the `pse_ts_dataupload` table. All the data in the column will be lost.
  - You are about to drop the column `Prod_Seq` on the `pse_ts_dataupload` table. All the data in the column will be lost.
  - Added the required column `delivery_date` to the `pse_ts_dataupload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prod_seq` to the `pse_ts_dataupload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pse_ts_dataupload" DROP COLUMN "Delivery_Date",
DROP COLUMN "Prod_Seq",
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "prod_seq" INTEGER NOT NULL;
