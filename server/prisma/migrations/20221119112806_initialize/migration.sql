-- CreateEnum
CREATE TYPE "deEx" AS ENUM ('Export', 'Domestic');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Review', 'Finish', 'Repack');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Operator', 'Manager', 'SAP_Operator', 'Administrator');

-- CreateTable
CREATE TABLE "Pallet" (
    "id" SERIAL NOT NULL,
    "palletNo" INTEGER NOT NULL,

    CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackingList" (
    "id" SERIAL NOT NULL,
    "idNo" INTEGER NOT NULL,
    "palletID" INTEGER NOT NULL,
    "modelCode" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,

    CONSTRAINT "PackingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackingCheckSheet" (
    "id" SERIAL NOT NULL,
    "palletID" INTEGER NOT NULL,

    CONSTRAINT "PackingCheckSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionList" (
    "id" SERIAL NOT NULL,
    "packingCheckSheetID" INTEGER NOT NULL,

    CONSTRAINT "QuestionList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionItems" (
    "id" SERIAL NOT NULL,
    "questionListID" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "questionStatus" BOOLEAN NOT NULL DEFAULT false,
    "deEx" "deEx" NOT NULL,

    CONSTRAINT "QuestionItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "palletID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Operator',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pallet_palletNo_key" ON "Pallet"("palletNo");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionList_packingCheckSheetID_key" ON "QuestionList"("packingCheckSheetID");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLog_palletID_key" ON "ActivityLog"("palletID");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "PackingList" ADD CONSTRAINT "PackingList_palletID_fkey" FOREIGN KEY ("palletID") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingCheckSheet" ADD CONSTRAINT "PackingCheckSheet_palletID_fkey" FOREIGN KEY ("palletID") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionList" ADD CONSTRAINT "QuestionList_packingCheckSheetID_fkey" FOREIGN KEY ("packingCheckSheetID") REFERENCES "PackingCheckSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionItems" ADD CONSTRAINT "QuestionItems_questionListID_fkey" FOREIGN KEY ("questionListID") REFERENCES "QuestionList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_palletID_fkey" FOREIGN KEY ("palletID") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
