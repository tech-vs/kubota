import { useEffect, useState } from 'react'
import Barcode, { Options } from 'react-barcode'
import { IPreviewDataFormat1 } from '@/models/preview.model'

interface Props {
  content: IPreviewDataFormat1
}

const PDFFormat1 = ({ content }: Props) => {
  const [barcodeOption, setBarcodeOption] = useState<Options>({
    width: 0.8,
    height: 25,
    displayValue: false,
    textMargin: 0,
    margin: 0,
    marginLeft: 4,
    marginRight: 4,
    fontSize: 8,
    format: 'CODE128'
  })

  const chunk = (arr: IPreviewDataFormat1["question_list"], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );


  const [question2, setQuestion2] = useState<IPreviewDataFormat1["question_list"][]>([])
  const [changes, setChanges] = useState<IPreviewDataFormat1["changes"]>([])
  
  function mockChanges () {
    const template = {
      edition: '',
      date: '',
      detail: '',
      approve_by: '',
      approve_date: '',
      authorized_by: '',
      created_by: ''
    }
    let arr: IPreviewDataFormat1["changes"] = []
    for(let i = 0 ; i < 3 ; i++) {
      arr = [
        ...arr,
        template
      ]
    }
    setChanges(arr) 
  }

  useEffect(() => {
    const question_list = content.question_list.filter(f => f.section === 2)
    setQuestion2(chunk(question_list, 5))
  }, [content.question_list])

  useEffect(() => {
    mockChanges()
  }, [])

  return (
    <>
      <div className="page" data-size="A4">
        <div className="flex justify-between items-center ">
          <div className="fs-17 bold">Checksheet Issuing</div>
          <div className="fs-9 bold">Doc : {content.doc_id || '-'} Eff.: {content.doc_date || '-'}</div>
        </div>
        <div className="section fs-11 bold">
          <table>
            <tbody className="fs-11 bold">
              <tr>
                <td style={{ width: '30%' }}>
                  Engine Packing Check Sheet
                </td>
                <td style={{ width: '30%' }}>
                  Packing Date : {content.packing_date || '-'}
                </td>
                <td style={{ width: '30%' }}>
                  Distributor : THAILAND
                </td>
              </tr>
            </tbody>
          </table>
          <table className="clear-border-cell-top">
            <thead>
              <tr>
                <td colSpan={2}>Model Code</td>
                <td>Model Name</td>
                <td>ID Number</td>
                <td colSpan={2}>Serial No.</td>
                <td style={{ fontSize: '6pt' }}>ลงชื่ออนุมัติผ่าน<br /> (Pass Mark)</td>
              </tr>
            </thead>
            <tbody>
              {
                content.part_list.map((m, i) =>
                  <tr key={m.id_no + i}>
                    <td>{m.model_code || ''}</td>
                    <td> <div className="flex justify-center items-center "><Barcode value={m.model_code || ''} {...barcodeOption} /></div> </td>
                    <td>{m.model_name || ''}</td>
                    <td>{m.id_no || ''}</td>
                    <td>{m.serial_no || ''}</td>
                    <td><div className="flex justify-center items-center "><Barcode value={ m.serial_no || ''} {...barcodeOption} /></div></td>
                    <td></td>
                  </tr>,
                )
              }
            </tbody>
          </table>
        </div>

        <div className="flex items-center fs-9 bold" style={{ gap: '32pt', marginTop: '12pt' }}>
          <div style={{ width: '120pt' }}>
            Pallet Code: {content.pallet}
          </div>
          <div>
            <div>
              ผ่าน: 0
            </div>
            <div>
              Pass
            </div>
          </div>
          <div>
            <div>
              ไม่ผ่าน: x
            </div>
            <div>
              Reject
            </div>
          </div>
        </div>
        <div className="section">
          <table>
            <thead className="fs-11 bold">
              <tr>
                <td style={{ width: '10%' }}>
                  No.
                </td>
                <td style={{ width: '60%' }}>
                  หัวข้อการตรวจสอบ
                  <br />
                  Detail
                </td>
                <td style={{ width: '30%' }}>
                  ตรวจสอบ
                  <br />
                  Check
                </td>
              </tr>
            </thead>
            <tbody>
              {
                content.question_list.filter(f => f.section === 1).map((m, i) =>
                  <tr style={{ fontSize: '8.5pt' }} key={m.id}>
                    <td>
                      {m.id ? m.id : ''}
                    </td>
                    <td style={{ textAlign: 'left' }}>{m.text || ''}
                    </td>
                    <td>{m.status !== undefined ? m.status ? '0' : 'X' : ''} </td>
                  </tr>)
              }

            </tbody>
          </table>
        </div>
        <div className="section">
          <div className="fs-11 bold">Appearance check sheet (For Export engine only) [Mark =&gt; O : OK , X : NG ]</div>
          {
            question2.map((table, itable) =>
              <div className={`inline-flex ${content.question_list.filter(f => f.section === 2).length <= 5 ? 'w-full' : 'w-50'}`} key={itable} >
                <table>
                  <thead className="fs-11 bold">
                    <tr>
                      <td style={{ width: '10%' }}>
                        Mark
                      </td>
                      <td style={{ width: '60%' }}>
                        Check List
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table.map((m, i) =>
                        <tr style={{ fontSize: '8.5pt' }} key={i}>
                          <td>{m.status ? 'O' : 'X'}</td>
                          <td style={{ textAlign: 'left' }}>
                            {m.text || ''}
                          </td>
                        </tr>)
                    }

                  </tbody>
                </table>
              </div>,
            )
          }

        </div>
        <div className="section">
          <div className="fs-11 bold">Appearance check sheet (For Export engine only) [Mark =&gt; O : OK , X : NG ]</div>
          <div className="flex fs-9 bold">
            <div className="flex items-center" style={{ width: '70%', gap: '10pt' }}>
              <div className="flex items-center" style={{ paddingLeft: '16pt', gap: '6pt' }}>
                <div style={{width: '20px', height: '20px', border: 'solid 1pt'}}></div> Bolt
              </div>
              <div className="flex items-center" style={{ paddingLeft: '16pt', gap: '6pt' }}>
                <div  style={{width: '20px', height: '20px', border: 'solid 1pt'}}></div> Cover Turbo
              </div>
            </div>
            <div style={{ width: '30%' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '40%' }}>ลงชื่อ<br />Sign</td>
                    <td style={{ width: '60%' }}>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="section" style={{ marginTop: '12pt' }}>
          <table className="fs-9">
            <thead>
              <tr>
                <td>
                  จัดทํา แก้ไข <br /> Edition
                </td>
                <td>
                  วัน เดือน ปี<br />Date
                </td>
                <td>
                  รายละเอียด เหตุผล<br /> Detail of Change
                </td>
                <td>
                  อนุมัติ<br />App by
                </td>
                <td>
                  วันทีอนุมัติ<br />App Date
                </td>
                <td>
                  รับรอง<br />Authr
                </td>
                <td>
                  ผู้จัดทํา<br />Created By
                </td>
              </tr>
            </thead>
            <tbody className="fs-9">
              {
                changes.map((c, i) =>
                  <tr key={c.edition + i} style={{ height: '17px'}}>
                    <td>
                      {c.edition || '' }
                    </td>
                    <td>
                      {c.date || '' }
                    </td>
                    <td>
                      {c.detail || '' }
                    </td>
                    <td>
                      {c.approve_by || '' }
                    </td>
                    <td>
                      {c.approve_date || '' }
                    </td>
                    <td>
                      {c.authorized_by || '' }
                    </td>
                    <td>
                      {c.created_by || '' }
                    </td>
                  </tr>,
                )
              }
            </tbody>
          </table>
        </div>
        <div className="section flex justify-around fs-11 bold">
          <div>Kubota Engine (Thailand) Co.,Ltd</div>
          <div>Production Control Department</div>
        </div>
      </div>
    </>
  )
}

export default PDFFormat1
