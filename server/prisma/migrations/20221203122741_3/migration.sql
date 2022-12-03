/*
  Warnings:

  - Added the required column `Prod_Seq` to the `PSE_TS_DataUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PSE_TS_DataUpload" ADD COLUMN     "Prod_Seq" INTEGER NOT NULL;
