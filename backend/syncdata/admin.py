from django.contrib import admin

from syncdata.models import (
    PSETSDataUpload,
    ProdInfoHistory,
    MasterLoading,
    LogSyncData,
    MSPackingStyle,
)


@admin.register(PSETSDataUpload)
class PSEAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'id_no', 'id_sharp', 'prod_seq', 'item_sharp', 'pallet_sharp', 'skewer_sharp', 'modelname', 'delivery_date',)


@admin.register(ProdInfoHistory)
class ProdInfoHistoryAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'id_no', 'plan_prod_finish_ym', 'model_code', 'model_name', 'serial_no', 'country_code', 'country_name', 'distributor_code', 'distributor_name',)


@admin.register(MasterLoading)
class MasterLoadingAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'stopshipment_date', 'model_code', 'model_name', 'serial_no', 'status',)


@admin.register(LogSyncData)
class LogSyncDataAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'table', 'created_at', 'detail',)


@admin.register(MSPackingStyle)
class MSPackingStyleAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'row_id', 'model_code', 'packing_style_code', 'net_weight', 'gross_weight',)
