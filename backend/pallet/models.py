from django.db import models
from django.utils import timezone
import datetime
import pytz

from utils.models import CommonInfoModel


class QuestionType(models.TextChoices):
    DOMESTIC = 'Domestic'
    EXPORT = 'Export'


class NWGW(models.TextChoices):
    UNIT1 = '0173'
    UNIT4 = '0473'


class PalletStatus(models.TextChoices):
    FINISH_PACK = 'finish_pack'
    REPACK = 'repack'
    SHIPPED = 'shipped'
    FINISH_PACKING_LIST = 'finish_packing_list'


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


class PalletPart(CommonInfoModel):
    pallet = models.ForeignKey('pallet.Pallet', on_delete=models.CASCADE, null=True)
    part = models.ForeignKey('syncdata.ProdInfoHistory', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.id}'


class PalletQuestion(CommonInfoModel):
    pallet = models.ForeignKey('pallet.Pallet', on_delete=models.CASCADE, null=True)
    question = models.ForeignKey('pallet.QuestionTemplate', on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=255)
    status = models.BooleanField(default=False)
    type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)
    section = models.IntegerField()

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.text


class Pallet(CommonInfoModel):
    pallet = models.CharField(max_length=255, null=True, blank=True)
    skewer = models.CharField(max_length=255, null=True, blank=True)
    pallet_string = models.CharField(max_length=255, null=True)
    internal_pallet_no = models.CharField(max_length=10, null=True)
    nw_gw = models.CharField(max_length=100, choices=NWGW.choices, null=True)
    packing_status = models.BooleanField(default=False)
    packing_datetime = models.DateTimeField(null=True)
    status = models.CharField(max_length=100, choices=PalletStatus.choices, null=True)
    question_type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)
    question_list = models.ManyToManyField(
        'pallet.QuestionTemplate',
        through='pallet.PalletQuestion',
        blank=True,
    )
    part_list = models.ManyToManyField(
        'syncdata.ProdInfoHistory',
        through='pallet.PalletPart',
        blank=True,
    )
    
    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.pallet}{self.skewer}'

    @staticmethod
    def get_date_from_pallet_string(pallet_string: str) -> str:
        if pallet_string:
            date = pallet_string[-8:]
            return f'{date[6:8]}/{date[4:6]}/{date[0:4]}'
        return ''

    def generate_question(self, type: str) -> None:
        question_data_list = QuestionTemplate.objects.filter(type=type)
        pallet_question_list = []
        for question in question_data_list:
            pallet_question_list.append(
                PalletQuestion(
                    text=question.text,
                    type=question.type,
                    section=question.section,
                    question=question,
                    pallet=self,
                )
            )
            # section_dict[section['section']] = section_dict.get(section['section'], []) + [section]
        PalletQuestion.objects.bulk_create(pallet_question_list)

    def can_submit_section(self, section: int) -> bool:
        if self.palletquestion_set.filter(section=section, status=False).exists():
            return False
        return True

    @staticmethod
    def generate_internal_pallet_no() -> str:
        tz = pytz.timezone('Asia/Bangkok')
        now = timezone.localtime(timezone=tz)
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


class QuestionTemplate(CommonInfoModel):
    text = models.TextField(max_length=255)
    type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)
    section = models.IntegerField()

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.text


class DocStatus(models.TextChoices):
    LOADING = 'loading'
    WAIT_APRROVE = 'wait_approve'
    APPROVED = 'approved'


class Document(CommonInfoModel):
    doc_no = models.CharField(max_length=255)
    delivery_date = models.CharField(max_length=100, null=True) #22/04/2022
    status = models.CharField(max_length=100, choices=DocStatus.choices, default=DocStatus.LOADING)
    pallet_list = models.ManyToManyField(
        'pallet.Pallet',
        through='DocumentPallet',
        blank=True,
    )
    ref_do_no = models.CharField(max_length=255, null=True)
    total_qty = models.CharField(max_length=255, null=True)
    invoice_no = models.CharField(max_length=255, null=True)
    round = models.CharField(max_length=255, null=True)
    customer_name = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    question_type = models.CharField(max_length=100, choices=QuestionType.choices, default=QuestionType.DOMESTIC)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.doc_no

    @staticmethod
    def generate_doc_object():
        last_doc = Document.objects.last()
        if last_doc and last_doc.status == DocStatus.LOADING:
            return last_doc
        tz = pytz.timezone('Asia/Bangkok')
        now = timezone.localtime(timezone=tz)
        year_4_digit = now.strftime("%Y")
        month = now.strftime("%m")
        day = now.strftime("%d")

        run_no = RunningNumber.objects.first()
        if day == '01':
            run_no.reset_all(month=month)
        no = str(run_no.doc_no).zfill(3)
        run_no.running_doc()
        doc_no_text = f'{day}{month}{year_4_digit}{no}'
        delivery_date_text = f'{day}/{month}/{year_4_digit}'

        new_doc = Document.objects.create(
            doc_no=doc_no_text,
            delivery_date=delivery_date_text,
        )
        
        return new_doc


class DocumentPallet(CommonInfoModel):
    document = models.ForeignKey('pallet.Document', on_delete=models.CASCADE, null=True)
    pallet = models.ForeignKey('pallet.Pallet', on_delete=models.CASCADE, null=True)
