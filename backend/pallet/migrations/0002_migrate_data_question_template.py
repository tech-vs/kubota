from django.conf import settings
from django.db import migrations, models

'''
question section 1 Domestic
- รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label)
- Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์)
- พ่นน้ำมันสเปรย์กันสนิมแล้วหรือยัง
- โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์)
- Sequence ของ SKC ถูกต้องและตรงกับ Pallet Number เมือเทียบกับ Check List หรือไม่ ?
- Part ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?
- หมุนพัดลมตรวจเช็ค บิดงอ,เสียรูป หรือไม่ ( Model Combine )
- มี Tag อื่นๆ ติดอยู่กับเครื่องยนตร์ SKC หรือไม่

question section 2 Domestic
- OIL PIPE (TURBOCHARGER)
- SWITCH OIL
- BRACKET ACCEL CABLE
- CARTRID OIL FILTER
- SPEED CONTROL PLATE
- ORIFICE
- HOOK ENGINE
- ASSY PIPE OVERFLOW
- OIL PIPE (TURBOCHARGER)
- SENSOR WATER PUMP

question section 3 Domestic
- มี Tag อื่นๆ ติดอยู่กับเครื่องยนต์หรือไม่
- ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่
- ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่
- Barcode ติดที่เครื่องยนต์หรือไม่
- Bolt ยึดพาเลทมีทุกตัวหรือไม่
- Forkguide พาเลท ไม่หัก ไม่บิด ไม่งอ
- มีการ Marking Produc Label หรือไม่

question section 1 Export
- รุ่นของเครื่องยนต์ และสถานทีจัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label)
- Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์)
- พ่นนํ้ามันสเปรย์กันสนิมแล้วหรือยัง
- โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์)
- ติดถุงพลาสติกคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ / มีรูฉีกขาดหรือไม่
- ติด MODEL BOARD และ PRODUCT LABEL ที่ถุงคลุมเครื่อง ได้เรียบร้อยดีหรือไม่
- เปรียบเทียบ Serial No. ของเครื่องยนต์ จาก MODEL BOARD ว่าถูกต้องหรือไม่
- Part : ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?
- ข้อมูลที่ LABEL (CHN, CERTIFICATION), NAMEPLATE และ PRODUCT CERTIFICATE ถูกต้องหรือไม่
- [EKI Model] ตรวจสอบ Emission Label สูญหาย หรือชํารุด ฉีกขาด พับ บิดงอหรือไม่?
- ใส่ Packing Part ครบทุกเครื่อง และตรงตาม Model หรือไม่
- [Model TK] ใส่ Manual inst. ครบทุกเครื่องหรือไม่

question section 2 Export (เหมือน Domestic เลย)
- OIL PIPE (TURBOCHARGER)
- SWITCH OIL
- BRACKET ACCEL CABLE
- CARTRID OIL FILTER
- SPEED CONTROL PLATE
- ORIFICE
- HOOK ENGINE
- ASSY PIPE OVERFLOW
- OIL PIPE (TURBOCHARGER)
- SENSOR WATER PUMP


question section 3 Export
- ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด
- S/N ที่ Model Board ตรงกับ Packing list
- Barcodeติดที่เครื่องยนต์หรือไม่
- Bolt ยึด Pallet มีทุกตัวหรือไม่
- Forkguide หัก บิด งอ หรือไม่
- พาเลทชำรุดหรือไม่
- ติด Shipping mark เรียบร้อยดีหรือไม่
- รถขนส่งสภาพพร้อมใช้งานหรือไม่
'''

def migrate_question_template_data(apps, schema_editor):
    QuestionTemplate = apps.get_model('pallet', 'QuestionTemplate')
    question_template_data_domestic_section_1 = [
        {'text': 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label)'},
        {'text': 'Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์)'},
        {'text': 'พ่นน้ำมันสเปรย์กันสนิมแล้วหรือยัง'},
        {'text': 'โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์)'},
        {'text': 'Sequence ของ SKC ถูกต้องและตรงกับ Pallet Number เมือเทียบกับ Check List หรือไม่ ?'},
        {'text': 'Part ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?'},
        {'text': 'หมุนพัดลมตรวจเช็ค บิดงอ,เสียรูป หรือไม่ ( Model Combine )'},
        {'text': 'มี Tag อื่นๆ ติดอยู่กับเครื่องยนตร์ SKC หรือไม่'},
    ]
    question_template_data_domestic_section_2 = [
        {'text': 'OIL PIPE (TURBOCHARGER)'},
        {'text': 'SWITCH OIL'},
        {'text': 'BRACKET ACCEL CABLE'},
        {'text': 'CARTRID OIL FILTER'},
        {'text': 'SPEED CONTROL PLATE'},
        {'text': 'ORIFICE'},
        {'text': 'HOOK ENGINE'},
        {'text': 'ASSY PIPE OVERFLOW'},
        {'text': 'OIL PIPE (TURBOCHARGER)'},
        {'text': 'SENSOR WATER PUMP'},
    ]
    question_template_data_domestic_section_3 = [
        {'text': 'มี Tag อื่นๆ ติดอยู่กับเครื่องยนต์หรือไม่'},
        {'text': 'ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่'},
        {'text': 'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่'},
        {'text': 'Barcode ติดที่เครื่องยนต์หรือไม่'},
        {'text': 'Bolt ยึดพาเลทมีทุกตัวหรือไม่'},
        {'text': 'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่'},
        {'text': 'Forkguide พาเลท ไม่หัก ไม่บิด ไม่งอ'},
        {'text': 'มีการ Marking Produc Label หรือไม่'},
    ]
    question_template_data_export_section_1 = [
        {'text': 'รุ่นของเครื่องยนต์ และสถานทีจัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label)'},
        {'text': 'Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์)'},
        {'text': 'พ่นนํ้ามันสเปรย์กันสนิมแล้วหรือยัง'},
        {'text': 'โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์)'},
        {'text': 'ติดถุงพลาสติกคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ / มีรูฉีกขาดหรือไม่'},
        {'text': 'ติด MODEL BOARD และ PRODUCT LABEL ที่ถุงคลุมเครื่อง ได้เรียบร้อยดีหรือไม่'},
        {'text': 'เปรียบเทียบ Serial No. ของเครื่องยนต์ จาก MODEL BOARD ว่าถูกต้องหรือไม่'},
        {'text': 'Part : ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?'},
        {'text': 'ข้อมูลที่ LABEL (CHN, CERTIFICATION), NAMEPLATE และ PRODUCT CERTIFICATE ถูกต้องหรือไม่'},
        {'text': '[EKI Model] ตรวจสอบ Emission Label สูญหาย หรือชํารุด ฉีกขาด พับ บิดงอหรือไม่?'},
        {'text': 'ใส่ Packing Part ครบทุกเครื่อง และตรงตาม Model หรือไม่'},
        {'text': '[Model TK] ใส่ Manual inst. ครบทุกเครื่องหรือไม่'},
    ]
    question_template_data_export_section_2 = [
        {'text': 'OIL PIPE (TURBOCHARGER)'},
        {'text': 'SWITCH OIL'},
        {'text': 'BRACKET ACCEL CABLE'},
        {'text': 'CARTRID OIL FILTER'},
        {'text': 'SPEED CONTROL PLATE'},
        {'text': 'ORIFICE'},
        {'text': 'HOOK ENGINE (export)'},
        {'text': 'ASSY PIPE OVERFLOW'},
        {'text': 'OIL PIPE (TURBOCHARGER)'},
        {'text': 'SENSOR WATER PUMP'},
    ]
    question_template_data_export_section_3 = [
        {'text': 'ถุงพลาสติดห่อเครื่องยนต์ไม่หลุดไม่ฉีกขาด'},
        {'text': 'S/N ที่ Model Board ตรงกับ Packing list'},
        {'text': 'Barcode ติดที่เครื่องยนต์หรือไม่'},
        {'text': 'Bolt ยึด Pallet มีทุกตัวหรือไม่'},
        {'text': 'Forkguide หัก บิด งอ หรือไม่'},
        {'text': 'พาเลทชำรุดหรือไม่'},
        {'text': 'ติด Shipping mark เรียบร้อยดีหรือไม่'},
        {'text': 'รถขนส่งสภาพพร้อมใช้งานหรือไม่'},
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
