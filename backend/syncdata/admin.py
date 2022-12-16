from django.contrib import admin

from syncdata.models import (
    PSETSDataUpload,
    ProdInfoHistory,
)


@admin.register(PSETSDataUpload)
class PSEAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'prod_seq', 'item_sharp', 'pallet_sharp', 'skewer_sharp', 'modelname', 'serial_no', 'delivery_date')


@admin.register(ProdInfoHistory)
class ProdInfoHistoryAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'id_no', 'plan_prod_finish_ym', 'model_code', 'model_name', 'serial_no', 'country_code', 'country_name', 'distributor_code', 'distributor_name')
