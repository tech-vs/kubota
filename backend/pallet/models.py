from django.db import models
from django.utils import timezone
import datetime

from utils.models import CommonInfoModel


class QuestionType(models.TextChoices):
    DOMESTIC = 'Domestic'
    EXPORT = 'Export'


class NWGW(models.TextChoices):
    UNIT1 = '0173'
    UNIT4 = '0473'


class RunningNumber(CommonInfoModel):
    doc_no = models.IntegerField(default=1)
    pallet_no = models.IntegerField(default=1)
    month = models.CharField(max_length=255, null=True)

    def running_doc(self):
        self.doc_no += 1
        self.save()

    def running_pallet(self):
        self.pallet_no += 1
        self.save()

    def reset_all(self, month:str = ''):
        if self.month != month:
            self.month = month
            self.doc_no = 1
            self.pallet_no = 1
        self.save()


class Pallet(CommonInfoModel):
    pallet = models.CharField(max_length=255)
    skewer = models.CharField(max_length=255)
    pallet_string = models.CharField(max_length=255, null=True)
    internal_pallet_no = models.CharField(max_length=10, null=True)
    nw_gw = models.CharField(max_length=100, choices=NWGW.choices, null=True)
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

    @staticmethod
    def generate_internal_pallet_no() -> str:
        now = timezone.now()
        # now = datetime.datetime(2009, 1, 12, 18, 00)
        year = now.strftime("%Y")[-2:]
        month = now.strftime("%m")
        day = now.strftime("%d")
        # if day == '01':

        # pallet_no = f'{year}{month}{no}'
        # print(f'{i:05d}')
        run_no = RunningNumber.objects.first()
        if day == '01':
            run_no.reset_all(month=month)
        no = str(run_no.pallet_no).zfill(4)
        run_no.running_pallet()
        
        return f'{year}{month}{no}'


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
