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

'''
question section 1 Domestic
- รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label)
   Engine Model and Destination correct or not ? (Check at Barcode on Product Label)
-  Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์) Check the Serial No. of Engine showed in MODEL BOARD correct or not ?
- พ่นน้ำมันสเปรย์กันสนิมแล้วหรือยัง Already use rust preventive solvent ?
- โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์) Have BOLT already been tighten or not ? (Check by Torque Mark at BOLT)
-  Sequence ของ SKC ถูกต้องและตรงกับ Pallet Number เมือเทียบกับ Check List หรือไม่ ? SKC's Sequence is correct with pallet number of check list sheet ?
- Part ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ? Part ASSY PIPE OVER FLOW got damage or not ?
- หมุนพัดลมตรวจเช็ค บิดงอ,เสียรูป หรือไม่ ( Model Combine ) [Model Combine] rotate fan, check warped, lose shape or not?
- มี Tag อื่นๆ ติดอยู่กับเครื่องยนตร์ SKC หรือไม่ Tags attached to the SKC engine or not?


question section 1 Export
- รุ่นของเครื่องยนต์ และสถานทีจัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)
- Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์) Check the Serial No. of Engine showed in MODEL BOARD correct or not ?
- พ่นนํ้ามันสเปรย์กันสนิมแล้วหรือยัง Already use rust preventive solvent ?
- โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์) Have BOLT already been tighten or not ? (Check by Torque Mark at BOLT)
- ติดถุงพลาสติกคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ / มีรูฉีกขาดหรือไม่ Pack engine in pastic bag properly or not ? / Any hole at plastic bag ?
- ติด MODEL BOARD และ PRODUCT LABEL ที่ถุงคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ Is there any problem of MODEL BOARD, PRODUCT LABEL attached on plastic bag?
- เปรียบเทียบ Serial No. ของเครื่องยนต์ จาก MODEL BOARD ว่าถูกต้องหรือไม่ Check the Serial No. of Engine showed in MODEL BOARD correct or not ? 
- Part : ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?  Part : ASSY PIPE OVER FLOW got damage or not ?
- ข้อมูลที่ LABEL (CHN, CERTIFICATION), NAMEPLATE และ PRODUCT CERTIFICATE ถูกต้องหรือไม่ Check LABEL (CHN, CERTIFICATION), NAMEPLATE and PRODUCT CERTIFICATE correct or not ?
- [EKI Model] ตรวจสอบ Emission Label สูญหาย หรือชํารุด ฉีกขาด พับ บิดงอหรือไม่? [EKI Model] Checking Emission Label are loss or got damage and abnormel or not?
- ใส่ Packing Part ครบทุกเครื่อง และตรงตาม Model หรือไม่ Put the packing part in all engine and match the model or not?
- [Model TK] ใส่ Manual inst. ครบทุกเครื่องหรือไม่ [Model TK] put manual Instruction all machine or not?
'''

def migrate_question_template_data(apps, schema_editor):
    QuestionTemplate = apps.get_model('pallet', 'QuestionTemplate')
    question_template_data_domestic_section_1 = [
        {'text': 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)'},
        {'text': 'Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์) Check the Serial No. of Engine showed in MODEL BOARD correct or not ?'},
        {'text': 'พ่นน้ำมันสเปรย์กันสนิมแล้วหรือยัง Already use rust preventive solvent ?'},
        {'text': 'โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์) Have BOLT already been tighten or not ? (Check by Torque Mark at BOLT)'},
        {'text': 'Sequence ของ SKC ถูกต้องและตรงกับ Pallet Number เมือเทียบกับ Check List หรือไม่ ? SKC\'s Sequence is correct with pallet number of check list sheet ?'},
        {'text': 'Part ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ? Part ASSY PIPE OVER FLOW got damage or not ?'},
        {'text': 'หมุนพัดลมตรวจเช็ค บิดงอ,เสียรูป หรือไม่ ( Model Combine ) [Model Combine] rotate fan, check warped, lose shape or not ?'},
        {'text': 'มี Tag อื่นๆ ติดอยู่กับเครื่องยนตร์ SKC หรือไม่ Tags attached to the SKC engine or not?'},
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
        {'text': 'รุ่นของเครื่องยนต์ และสถานทีจัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ที่ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)'},
        {'text': 'Serial No. ที่ Product Label ว่าถูกต้องหรือไม่ (ตรวจสอบ โดยอ่านเปรียบเทียบกับ Serial No. ของเครื่องยนต์) Check the Serial No. of Engine showed in MODEL BOARD correct or not ?'},
        {'text': 'พ่นนํ้ามันสเปรย์กันสนิมแล้วหรือยัง Already use rust preventive solvent ?'},
        {'text': 'โบลท์สําหรับยึดเครื่องยนต์ ได้ถูกขันแน่น แล้วหรือไม่ (ดูจากรอยมาร์ก ที่โบลท์) Have BOLT already been tighten or not ? (Check by Torque Mark at BOLT)'},
        {'text': 'ติดถุงพลาสติกคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ / มีรูฉีกขาดหรือไม่ Pack engine in pastic bag properly or not ? / Any hole at plastic bag ?'},
        {'text': 'ติด MODEL BOARD และ PRODUCT LABEL ที่ถุงคลุมเครื่อง ได้เรียบร้อยดีหรือไม่ Is there any problem of MODEL BOARD, PRODUCT LABEL attached on plastic bag ?'},
        {'text': 'เปรียบเทียบ Serial No. ของเครื่องยนต์ จาก MODEL BOARD ว่าถูกต้องหรือไม่ Check the Serial No. of Engine showed in MODEL BOARD correct or not ? '},
        {'text': 'Part : ASSY PIPE OVER FLOW บิดงอ หรือเสียรูปหรือไม่ ?  Part : ASSY PIPE OVER FLOW got damage or not ?'},
        {'text': 'ข้อมูลที่ LABEL (CHN, CERTIFICATION), NAMEPLATE และ PRODUCT CERTIFICATE ถูกต้องหรือไม่ Check LABEL (CHN, CERTIFICATION), NAMEPLATE and PRODUCT CERTIFICATE correct or not ?'},
        {'text': '[EKI Model] ตรวจสอบ Emission Label สูญหาย หรือชํารุด ฉีกขาด พับ บิดงอหรือไม่? [EKI Model] Checking Emission Label are loss or got damage and abnormel or not ?'},
        {'text': 'ใส่ Packing Part ครบทุกเครื่อง และตรงตาม Model หรือไม่ Put the packing part in all engine and match the model or not ?'},
        {'text': '[Model TK] ใส่ Manual inst. ครบทุกเครื่องหรือไม่ [Model TK] put manual Instruction all machine or not ?'},
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
