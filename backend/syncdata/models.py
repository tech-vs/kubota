from django.db import models
from django.utils import timezone

from utils.models import CommonInfoModel


class ProdResult(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    plan_monthly_seq = models.IntegerField(null=True)
    plan_monthlu_sub_seq = models.IntegerField(null=True)
    lastest_monthly_seq = models.IntegerField(null=True)
    latest_monthly_sub_seq = models.IntegerField(null=True)
    id_no = models.CharField(max_length=255, null=True)
    prod_stat_us = models.IntegerField(null=True)
    no_work_sign = models.IntegerField(null=True)
    actual_monthly_seq = models.IntegerField(null=True)
    actual_monthly_sub_seq = models.CharField(max_length=255, null=True)
    error_code = models.CharField(max_length=255, null=True)
    error_msg = models.CharField(max_length=255, null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class PackingIssuingDetail(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    id_no = models.IntegerField(null=True)
    packing_sequence_no = models.IntegerField(null=True)
    report_no = models.IntegerField(null=True)
    issue_datetime = models.DateTimeField(null=True)
    packing_unit = models.IntegerField(null=True)
    model_code = models.CharField(max_length=255, null=True)
    distributor_code = models.IntegerField(null=True)
    model_name = models.CharField(max_length=255, null=True)
    serial_no = models.CharField(max_length=255, null=True)
    packing_style_code = models.IntegerField(null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class PackingIssuingHistory(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    report_no = models.IntegerField(null=True)
    item_number = models.IntegerField(null=True)
    item_description = models.CharField(max_length=255, null=True)
    number_of_times = models.IntegerField(null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class MSSequenceNo(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    actual_work_month = models.DateTimeField(null=True)
    sequence_no = models.IntegerField(null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class MSActualMonthlySeq(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    actual_work_month = models.DateTimeField(null=True)
    actual_running_seq = models.IntegerField(null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class MSReportSeq(CommonInfoModel):
    station_no = models.CharField(max_length=255, null=True)
    form_code = models.CharField(max_length=255, null=True)
    last_report_no = models.IntegerField(null=True)
    create_date = models.DateTimeField(null=True)
    create_by = models.CharField(max_length=255, null=True)
    update_date = models.DateTimeField(null=True)
    update_by = models.CharField(max_length=255, null=True)


class PSETSDataUpload(CommonInfoModel):
    prod_seq = models.IntegerField(null=True)
    delivery_date = models.CharField(max_length=255, null=True)
    pallet = models.IntegerField(null=True)
    skewer = models.IntegerField(null=True)
