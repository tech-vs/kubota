from django.contrib import admin

from pallet.models import (
    Pallet,
    Section,
    Question,
    QuestionTemplate,
    RunningNumber,
)

class SectionInline(admin.TabularInline):
    model = Pallet.section_list.through
    extra = 0


@admin.register(Pallet)
class PalletAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'pallet', 'skewer', 'pallet_string', 'internal_pallet_no', 'packing_status', 'packing_datetime', 'created_at', 'updated_at',)
    inlines = [SectionInline]

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('section_list',)
    
    # def get_pallet_skewer(self, obj):
    #     if obj:
    #         return f'{obj.pallet}-{obj.skewer}'
    #     else:
    #         return '-'
    # get_pallet_skewer.short_description = 'Pallet-Skewer'


class QuestionInline(admin.TabularInline):
    model = Section.question_list.through
    extra = 0


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'no', 'is_submit', 'created_at', 'updated_at',)
    inlines = [QuestionInline]

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('question_list',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'text', 'status', 'type', 'created_at', 'updated_at',)
    list_filter = ('type',)


@admin.register(QuestionTemplate)
class QuestionTemplateAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'text', 'type', 'section',)
    list_filter = ('type', 'section',)


@admin.register(RunningNumber)
class RunningNumberAdmin(admin.ModelAdmin):
    list_display = ('id', 'month', 'pallet_no', 'doc_no',)
