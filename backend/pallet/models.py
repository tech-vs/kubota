from django.db import models
from django.utils import timezone

from utils.models import CommonInfoModel


class QuestionType(models.TextChoices):
    DOMESTIC = 'Domestic'
    EXPORT = 'Export'


class Pallet(CommonInfoModel):
    pallet = models.IntegerField()
    skewer = models.IntegerField()
    packing_status = models.BooleanField(default=False)
    packing_datetime = models.DateTimeField(null=True)
    section_list = models.ManyToManyField(
        'pallet.Section',
        through='pallet.PalletSection',
        blank=True,
    )
    
    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.pallet}{self.skewer}'

    def generate_question(self, type: str) -> None:
        question_data_list = list(QuestionTemplate.objects.filter(type=type).values('text', 'type', 'section'))
        section_dict = {}
        for section in question_data_list:
            section_dict[section['section']] = section_dict.get(section['section'], []) + [section]
        
        section_list = []
        for section_no, question in section_dict.items():
            sec = Section.objects.create(no=section_no)
            section_list.append(sec)
            qa_list = [Question.objects.create(text=qa['text'], type=qa['type']) for qa in question]
            sec.question_list.set(qa_list)

        self.section_list.set(section_list)


class PalletSection(CommonInfoModel):
    pallet = models.ForeignKey('pallet.Pallet', on_delete=models.CASCADE, null=True)
    section = models.ForeignKey('pallet.Section', on_delete=models.CASCADE, null=True)


class Section(CommonInfoModel):
    no = models.IntegerField()
    question_list = models.ManyToManyField(
        'pallet.Question',
        through='pallet.SectionQuestion',
        blank=True,
    )
    is_submit = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return str(self.pk)


class SectionQuestion(CommonInfoModel):
    section = models.ForeignKey('pallet.Section', on_delete=models.CASCADE, null=True)
    question = models.ForeignKey('pallet.Question', on_delete=models.CASCADE, null=True)


class Question(CommonInfoModel):
    text = models.TextField(max_length=255)
    status = models.BooleanField(default=False)
    type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.text


class QuestionTemplate(CommonInfoModel):
    text = models.TextField(max_length=255)
    type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)
    section = models.IntegerField()

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.text
