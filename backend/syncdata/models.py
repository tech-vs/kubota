from django.db import models
from django.utils import timezone

from utils.models import CommonInfoModel


class PSETSDataUpload(CommonInfoModel):
    id_no = models.DecimalField(max_digits=30, decimal_places=15, unique=True)
    delivery_date = models.CharField(max_length=255, null=True, blank=True)
    delivery_time = models.CharField(max_length=255, null=True, blank=True)
    # ket_delivery = models.CharField(max_length=255, null=True, blank=True)
    # round_no_sharp = models.CharField(max_length=255, null=True, blank=True)
    # seq = models.CharField(max_length=255, null=True, blank=True)
    id_sharp = models.CharField(max_length=255, null=True, blank=True)
    # serial_sharp = models.CharField(max_length=255, null=True, blank=True)
    modelname = models.CharField(max_length=255, null=True, blank=True)
    # line_in_time = models.CharField(max_length=255, null=True, blank=True)
    item_sharp = models.CharField(max_length=255, null=True, blank=True)
    # item_description = models.CharField(max_length=255, null=True, blank=True)
    prod_seq = models.CharField(max_length=255, null=True, blank=True)
    # po_sharp = models.CharField(max_length=255, null=True, blank=True)
    # qty = models.CharField(max_length=255, null=True, blank=True)

    pallet_sharp = models.CharField(max_length=255, null=True, blank=True)
    skewer_sharp = models.CharField(max_length=255, null=True, blank=True)

    # dummy = models.CharField(max_length=255, null=True, blank=True)
    # pick_status = models.CharField(max_length=255, null=True, blank=True)
    # finish_date = models.DateTimeField(null=True)
    # engine_status = models.CharField(max_length=255, null=True, blank=True)
    # pack_status = models.CharField(max_length=255, null=True, blank=True)
    # to_stock = models.CharField(max_length=255, null=True, blank=True)
    # user_login = models.CharField(max_length=255, null=True, blank=True)
    # serial_no = models.CharField(max_length=255, null=True, blank=True)
    # scan_time = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.id_no}'


class ProdInfoHistory(CommonInfoModel):
    id_no = models.CharField(max_length=255)
    plan_prod_finish_ym = models.CharField(max_length=255)
    model_code = models.CharField(max_length=255, null=True, blank=True)
    model_name = models.CharField(max_length=255, null=True, blank=True)
    serial_no = models.CharField(max_length=255, null=True, blank=True)
    country_code = models.CharField(max_length=255, null=True, blank=True)
    country_name = models.CharField(max_length=255, null=True, blank=True)
    distributor_code = models.CharField(max_length=255, null=True, blank=True)
    distributor_name = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ['created_at']
        unique_together = ('id_no', 'plan_prod_finish_ym')

    def __str__(self):
        return f'{self.id_no}-{self.plan_prod_finish_ym}'
