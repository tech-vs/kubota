import { useState } from 'react'
import Barcode, { Options } from 'react-barcode'
const PDFFormat1 = () => {
  const [barcodeOption, setBarcodeOption] = useState<Options>({
    width: 0.8,
    height: 25,
    displayValue: false,
    textMargin: 0,
    margin: 0,
    fontSize: 8,
  })
  return (
    <>
      <div className="page" data-size="A4">
        <div className="flex justify-between items-center ">
          <div className="fs-17 bold">Checksheet Issuing</div>
          <div className="fs-9 bold">Doc : KET-FM-PC-LG-003 Eff.: 04/10/2022</div>
        </div>
        <div className="section fs-11 bold">
          <table>
            <tbody className="fs-11 bold">
              <tr>
                <td style={{ width: '30%' }}>
                  Engine Packing Check Sheet
                </td>
                <td style={{ width: '30%' }}>
                  Packing Date : YYYY/MM/DD TT:TT
                </td>
                <td style={{ width: '30%' }}>
                  Distributor : Thailand
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
                [...Array(4).keys()].map(m =>
                  <tr key={m}>
                    <td>2JXXX-XXXXX</td>
                    <td> <div className="flex justify-center items-center "><Barcode value="1JXXX-XXXXX" {...barcodeOption} /></div> </td>
                    <td>VXXXX-X-XX-X-XXXX</td>
                    <td>10XX0XXXX</td>
                    <td>BMLXXXX</td>
                    <td><div className="flex justify-center items-center "><Barcode value="BMLXXXX" {...barcodeOption} /></div></td>
                    <td />
                  </tr>,
                )
              }
            </tbody>
          </table>
        </div>

        <div className="flex items-center fs-9 bold" style={{ gap: '32pt', marginTop: '12pt' }}>
          <div style={{ width: '120pt' }}>
            Pallet Code:
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
                [...Array(15).keys()].map(m =>
                  <tr style={{ fontSize: '8.5pt' }} key={m}>
                    <td>
                      {m + 1}
                    </td>
                    <td style={{ textAlign: 'left' }}>รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label)
                      Engine Model and Destination correct or not ? (Check at Barcode on Product Label)
                    </td>
                    <td> </td>
                  </tr>)
              }

            </tbody>
          </table>
        </div>
        <div className="section">
          <div className="fs-11 bold">Appearance check sheet (For Export engine only) [Mark =&gt; O : OK , X : NG ]</div>
          {
            [...Array(2).keys()].map(t =>
              <div className="w-50 inline-flex" key={t}>
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
                      [...Array(5).keys()].map(m =>
                        <tr style={{ fontSize: '8.5pt' }} key={m}>
                          <td />
                          <td style={{ textAlign: 'left' }}>
                            {t === 1 ? m + 1 + 5 : m + 1} OIL PIPE (TURBOCHARGER)
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
              <div className="flex items-center" style={{ paddingLeft: '16pt' }}><input type="checkbox" /> Bolt</div>
              <div className="flex items-center"><input type="checkbox" /> Cover Turbo</div>
            </div>
            <div style={{ width: '30%' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '40%' }}>ลงชื่อ<br />Sign</td>
                    <td style={{ width: '60%' }} />
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
                [...Array(2).keys()].map(t =>
                  <tr key={t}>
                    <td>
                      Re_03
                    </td>
                    <td>
                      07.08.2015
                    </td>
                    <td>
                      Apply check pipe over flow to all model
                    </td>
                    <td>
                      K. Murakami
                    </td>
                    <td>
                      10.08.2015
                    </td>
                    <td>
                      Atthapong K
                    </td>
                    <td>
                      Atthapong K.
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
