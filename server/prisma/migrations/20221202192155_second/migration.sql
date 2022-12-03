-- CreateTable
CREATE TABLE "PROD_RESULT" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "plan_monthly_seq" INTEGER NOT NULL,
    "plan_monthlu_sub_seq" INTEGER NOT NULL,
    "latest_monthly_seq" INTEGER NOT NULL,
    "latest_monthly_sub_seq" INTEGER NOT NULL,
    "id_no" TEXT NOT NULL,
    "prod_stat_us" INTEGER NOT NULL,
    "no_work_sign" INTEGER NOT NULL,
    "actual_monthly_seq" INTEGER NOT NULL,
    "actual_monthly_sub_seq" TEXT NOT NULL,
    "error_code" TEXT NOT NULL,
    "error_msg" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "PROD_RESULT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PACKING_ISSUING_DETAIL" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "id_no" INTEGER NOT NULL,
    "packing_sequence_no" INTEGER NOT NULL,
    "report_no" INTEGER NOT NULL,
    "issue_datetime" TIMESTAMP(3) NOT NULL,
    "packing_unit" INTEGER NOT NULL,
    "model_code" TEXT NOT NULL,
    "distributor_code" INTEGER NOT NULL,
    "model_name" TEXT NOT NULL,
    "distributor_name" TEXT NOT NULL,
    "serial_no" TEXT NOT NULL,
    "packing_style_code" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "PACKING_ISSUING_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PACKING_ISSUING_HISTORY" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "report_no" INTEGER NOT NULL,
    "item_number" INTEGER NOT NULL,
    "item_description" TEXT NOT NULL,
    "number_of_times" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "PACKING_ISSUING_HISTORY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MS_SEQUENCE_NO" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "actual_work_month" TIMESTAMP(3) NOT NULL,
    "sequence_no" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "MS_SEQUENCE_NO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MS_ACTUAL_MONTHLY_SEQ" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "actual_work_month" TIMESTAMP(3) NOT NULL,
    "actual_running_seq" INTEGER NOT NULL,
    "create_date" INTEGER NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "MS_ACTUAL_MONTHLY_SEQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MS_REPORT_SEQ" (
    "id" SERIAL NOT NULL,
    "station_no" TEXT NOT NULL,
    "form_code" TEXT NOT NULL,
    "last_report_no" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "MS_REPORT_SEQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSE_TS_DataUpload" (
    "id" SERIAL NOT NULL,
    "Delivery_Date" TIMESTAMP(3) NOT NULL,
    "pallet" INTEGER NOT NULL,
    "skewer" INTEGER NOT NULL,

    CONSTRAINT "PSE_TS_DataUpload_pkey" PRIMARY KEY ("id")
);
