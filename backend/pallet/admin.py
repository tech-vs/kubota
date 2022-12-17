from django.contrib import admin

from pallet.models import (
    Pallet,
    QuestionTemplate,
    RunningNumber,
    Document,
)


class PartInline(admin.TabularInline):
    model = Pallet.part_list.through
    extra = 0


class QuestionInline(admin.TabularInline):
    model = Pallet.question_list.through
    extra = 0


@admin.register(Pallet)
class PalletAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'pallet', 'skewer', 'pallet_string', 'internal_pallet_no', 'packing_status', 'packing_datetime', 'created_at', 'updated_at',)
    inlines = [PartInline, QuestionInline,]

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('question_list', 'part_list')
    
    # def get_pallet_skewer(self, obj):
    #     if obj:
    #         return f'{obj.pallet}-{obj.skewer}'
    #     else:
    #         return '-'
    # get_pallet_skewer.short_description = 'Pallet-Skewer'


@admin.register(QuestionTemplate)
class QuestionTemplateAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'text', 'type', 'section',)
    list_filter = ('type', 'section',)


@admin.register(RunningNumber)
class RunningNumberAdmin(admin.ModelAdmin):
    list_display = ('id', 'month', 'pallet_no', 'doc_no',)


class DocumentInline(admin.TabularInline):
    model = Document.pallet_list.through
    extra = 0


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'doc_no', 'delivery_date', 'status')
    inlines = [DocumentInline]
