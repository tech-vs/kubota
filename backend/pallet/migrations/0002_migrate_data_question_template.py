from django.conf import settings
from django.db import migrations, models


def migrate_question_template_data(apps, schema_editor):
    QuestionTemplate = apps.get_model('pallet', 'QuestionTemplate')
    question_template_data_domestic_section_1 = [
        {'text': 'ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด (domestic)'},
        {'text': 'S/N ที่ Model Board ตรงกับ Packing list (domestic)'},
        {'text': 'Barcodeติดที่เครื่องยนต์หรือไม่ (domestic)'},
        {'text': 'Bolt ยึด Pallet มีทุกตัวหรือไม่ (domestic)'},
        {'text': 'Forkguide หัก บิด งอ หรือไม่ (domestic)'},
        {'text': 'พาเลทชำรุดหรือไม่ (domestic)'},
        {'text': 'ติด Shipping mark เรียบร้อยดีหรือไม่ (domestic)'},
        {'text': 'รถขนส่งสภาพพร้อมใช้งานหรือไม่ (domestic)'},
    ]
    question_template_data_domestic_section_2 = [
        {'text': 'OIL PIPE (domestic)'},
        {'text': 'SWITCH OIL (domestic)'},
        {'text': 'BRACKET ACCEL CABLE (domestic)'},
        {'text': 'CARTRID OIL FILTER (domestic)'},
        {'text': 'SPEED CONTROL PLATE (domestic)'},
        {'text': 'OFFICE (domestic)'},
        {'text': 'HOOK ENGINE (domestic)'},
        {'text': 'ASSY PIPE (domestic)'},
        {'text': 'OIL PIPE (domestic)'},
        {'text': 'SENSOR (domestic)'},
    ]
    question_template_data_domestic_section_3 = [
        {'text': 'มี Tag อื่นๆ ติดอยู่กับเครื่องยนต์หรือไม่ (domestic)'},
        {'text': 'ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่'},
        {'text': 'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่ (domestic)'},
        {'text': 'Barcode ติดที่เครื่องยนต์หรือไม่ (domestic)'},
    ]
    question_template_data_export_section_1 = [
        {'text': 'ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด (export)'},
        {'text': 'S/N ที่ Model Board ตรงกับ Packing list (export)'},
        {'text': 'Barcodeติดที่เครื่องยนต์หรือไม่ (export)'},
        {'text': 'Bolt ยึด Pallet มีทุกตัวหรือไม่ (export)'},
        {'text': 'Forkguide หัก บิด งอ หรือไม่ (export)'},
        {'text': 'พาเลทชำรุดหรือไม่ (export)'},
        {'text': 'ติด Shipping mark เรียบร้อยดีหรือไม่ (export)'},
        {'text': 'รถขนส่งสภาพพร้อมใช้งานหรือไม่ (export)'},
    ]
    question_template_data_export_section_2 = [
        {'text': 'OIL PIPE (export)'},
        {'text': 'SWITCH OIL (export)'},
        {'text': 'BRACKET ACCEL CABLE (export)'},
        {'text': 'CARTRID OIL FILTER (export)'},
        {'text': 'SPEED CONTROL PLATE (export)'},
        {'text': 'OFFICE (export)'},
        {'text': 'HOOK ENGINE (export)'},
        {'text': 'ASSY PIPE (export)'},
        {'text': 'OIL PIPE (export)'},
        {'text': 'SENSOR (export)'},
    ]
    question_template_data_export_section_3 = [
        {'text': 'มี Tag อื่นๆ ติดอยู่กับเครื่องยนต์หรือไม่ (export)'},
        {'text': 'ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่ (export)'},
        {'text': 'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่ (export)'},
        {'text': 'Barcode ติดที่เครื่องยนต์หรือไม่ (export)'},
    ]
    
    question_template_list = []
    for data in question_template_data_domestic_section_1:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Domestic', section=1))
    for data in question_template_data_export_section_1:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Export', section=1))
    for data in question_template_data_domestic_section_2:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Domestic', section=2))
    for data in question_template_data_export_section_2:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Export', section=2))
    for data in question_template_data_domestic_section_3:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Domestic', section=3))
    for data in question_template_data_export_section_3:
        question_template_list.append(QuestionTemplate(text=data['text'], type='Export', section=3))
    
    QuestionTemplate.objects.bulk_create(question_template_list)

def migrate_running_number_data(apps, schema_editor):
    RunningNumber = apps.get_model('pallet', 'RunningNumber')
    RunningNumber.objects.create(doc_no=1, pallet_no=1)


class Migration(migrations.Migration):
    dependencies = [
        ('pallet', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(migrate_question_template_data),
        migrations.RunPython(migrate_running_number_data),
    ]
