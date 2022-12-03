/*
  Warnings:

  - Changed the type of `delivery_date` on the `pse_ts_dataupload` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pse_ts_dataupload" DROP COLUMN "delivery_date",
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL;
