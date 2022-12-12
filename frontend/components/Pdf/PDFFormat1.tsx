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
    fontSize: 8,
  })

  const chunk = (arr: IPreviewDataFormat1["appearance_checks"], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );


  const [acc, setAcc] = useState<IPreviewDataFormat1["appearance_checks"][]>([])

  useEffect(() => {
    setAcc(chunk(content.appearance_checks, 5))
  }, [content.appearance_checks])

  return (
    <>
      <div className="page" data-size="A4">
        <div className="flex justify-between items-center ">
          <div className="fs-17 bold">Checksheet Issuing</div>
          <div className="fs-9 bold">Doc : {content.doc_id} Eff.: {content.doc_date}</div>
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
                  Distributor : {content.distributor}
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
                content.engine_models.map((m, i) =>
                  <tr key={m.model_code + i}>
                    <td>{m.model_code || ''}</td>
                    <td> <div className="flex justify-center items-center "><Barcode value={m.model_code || ''} {...barcodeOption} /></div> </td>
                    <td>{m.model_name || ''}</td>
                    <td>{m.id_number || ''}</td>
                    <td>{m.serial_no || ''}</td>
                    <td><div className="flex justify-center items-center "><Barcode value={m.serial_no || ''} {...barcodeOption} /></div></td>
                    <td>{m.is_pass !== undefined ? m.is_pass ? '0' : 'X' : ''}</td>
                  </tr>,
                )
              }
            </tbody>
          </table>
        </div>

        <div className="flex items-center fs-9 bold" style={{ gap: '32pt', marginTop: '12pt' }}>
          <div style={{ width: '120pt' }}>
            Pallet Code: {content.pallet_code}
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
                content.checks.map((m, i) =>
                  <tr style={{ fontSize: '8.5pt' }} key={m.check_no + i}>
                    <td>
                      {m.check_no ? m.check_no + 1 : ''}
                    </td>
                    <td style={{ textAlign: 'left' }}>{m.detail || ''}
                    </td>
                    <td>{m.is_pass !== undefined ? m.is_pass ? '0' : 'X' : ''} </td>
                  </tr>)
              }

            </tbody>
          </table>
        </div>
        <div className="section">
          <div className="fs-11 bold">Appearance check sheet (For Export engine only) [Mark =&gt; O : OK , X : NG ]</div>
          {
            acc.map((table, itable) =>
              <div className={`inline-flex ${content.appearance_checks.length <= 5 ? 'w-full' : 'w-50'}`} key={itable} >
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
                          <td>{m.mark ? 'O' : 'X'}</td>
                          <td style={{ textAlign: 'left' }}>
                            {m.check_list || ''}
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
              <div className="flex items-center" style={{ paddingLeft: '16pt' }}>
                <input checked={content.bolt} type="checkbox" readOnly /> Bolt
              </div>
              <div className="flex items-center">
                <input checked={content.cover_turbo} type="checkbox" readOnly /> Cover Turbo
              </div>
            </div>
            <div style={{ width: '30%' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '40%' }}>ลงชื่อ<br />Sign</td>
                    <td style={{ width: '60%' }}>
                      <img src={content.sign} alt="sign" width="100%" height="32" />
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
                content.changes.map((c, i) =>
                  <tr key={c.edition + i}>
                    <td>
                      {c.edition}
                    </td>
                    <td>
                      {c.date}
                    </td>
                    <td>
                      {c.detail}
                    </td>
                    <td>
                      {c.approve_by}
                    </td>
                    <td>
                      {c.approve_date}
                    </td>
                    <td>
                      {c.authorized_by}
                    </td>
                    <td>
                      {c.created_by}
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
