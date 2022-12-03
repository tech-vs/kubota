import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: any = [
  {
    username: "operator",
    password: "$2a$08$OQF3mPEsZVp0yVLEi4lSUugWnHW2vY9TQkI/NHFpp/hDSqFnWNMMy",
    role: "Operator",
  },
  {
    username: "admin",
    password: "$2a$08$OQF3mPEsZVp0yVLEi4lSUugWnHW2vY9TQkI/NHFpp/hDSqFnWNMMy",
    role: "Administrator",
  },
  {
    username: "manager",
    password: "$2a$08$OQF3mPEsZVp0yVLEi4lSUugWnHW2vY9TQkI/NHFpp/hDSqFnWNMMy",
    role: "Manager",
  },
];

const palletData1: any = {
  palletNo: 1,
  packingList: {
    create: [
      {
        idNo: 1,
        modelCode: "SDSF-123",
        serialNo: "1234",
      },
      {
        idNo: 2,
        modelCode: "SDSF-456",
        serialNo: "5678",
      },
    ],
  },
  packingCheckSheet: {
    create: [
      {
        questionList: {
          create: {
            questionItems: {
              create: [
                {
                  questionText: "ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด",
                  deEx: "Export",
                },
                {
                  questionText: "S/N ที่ Model Board ตรงกับ Packing list",
                  deEx: "Export",
                },
                {
                  questionText: "Barcodeติดที่เครื่องยนต์หรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "Bolt ยึด Pallet มีทุกตัวหรือไม่่",
                  deEx: "Export",
                },
                {
                  questionText: "Forkguide หัก บิด งอ หรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "พาเลทชำรุดหรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "ติด Shipping mark เรียบร้อยดีหรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "รถขนส่งสภาพพร้อมใช้งานหรือไม่",
                  deEx: "Export",
                },
              ],
            },
          },
        },
      },
    ],
  },
  status: {
    create: {
      status: "Finish",
    },
  },
};

const palletData2: any = {
  palletNo: 2,
  packingList: {
    create: [
      {
        idNo: 1,
        modelCode: "SDSF-123",
        serialNo: "1234",
      },
      {
        idNo: 2,
        modelCode: "SDSF-456",
        serialNo: "5678",
      },
    ],
  },
  packingCheckSheet: {
    create: [
      {
        questionList: {
          create: {
            questionItems: {
              create: [
                {
                  questionText: "ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด",
                  deEx: "Export",
                },
                {
                  questionText: "S/N ที่ Model Board ตรงกับ Packing list",
                  deEx: "Export",
                },
                {
                  questionText: "Barcodeติดที่เครื่องยนต์หรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "Bolt ยึด Pallet มีทุกตัวหรือไม่่",
                  deEx: "Export",
                },
                {
                  questionText: "Forkguide หัก บิด งอ หรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "พาเลทชำรุดหรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "ติด Shipping mark เรียบร้อยดีหรือไม่",
                  deEx: "Export",
                },
                {
                  questionText: "รถขนส่งสภาพพร้อมใช้งานหรือไม่",
                  deEx: "Export",
                },
              ],
            },
          },
        },
      },
    ],
  },
  status: {
    create: {
      status: "Finish",
    },
  },
};

async function main() {
  console.log(`Start seeding ...`);
  //create many not support sqlite
  await prisma.user.createMany({
    data: userData,
  });
  await prisma.pallet.create({
    data: palletData1,
  });
  await prisma.pallet.create({
    data: palletData2,
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
