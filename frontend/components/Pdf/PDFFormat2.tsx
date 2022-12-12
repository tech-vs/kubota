import { useState } from 'react'

const PDFFormat2 = () => {
  const [checkColumn, setCheckColumn] = useState([
    'มี Tag อื่นๆ ติดอยู่กับเครื่องยนต์หรือไม่',
    'ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่',
    'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
    'Barcode ติดที่เครื่องยนต์หรือไม่',
  ])
  return (
    <>
      <div className="page" data-size="A4">
        <div className="text-center fs-17 bold">
          Kubota Engine (Thailand) Co., Ltd.
        </div>
        <div className="fs-12">Address : 360 Moo3, Phanom Sarakarm, Chachoengsao 24120 Thailand</div>
        <div className="fs-12">Tel: 038-855136-40 ,Fax : 038-855145</div>
        <div className="section">
          <table className="fs-6 h-full table-fixed">
            <colgroup>
              <col style={{ width: '20pt' }} />
              <col style={{ width: '40pt' }} />
              <col style={{ width: '50pt' }} />
              <col style={{ width: '30pt' }} />
              <col style={{ width: '30pt' }} />
              {
                checkColumn.map((m, i) =>
                  <col key={i + '_column'} style={{ width: '10pt' }} />,
                )
              }
            </colgroup>
            <thead>
              <tr>
                <td colSpan={5} className="clear-border-top clear-border-left" style={{ height: '100%' }}>
                  <div className="flex flex-col justify-between" style={{ height: '100%' }}>
                    <table className="clear-border-table clear-border-cell fs-9">
                      <tbody>
                        <tr>
                          <td colSpan={4} className="bold fs-12">Packing list</td>
                        </tr>
                        <tr>
                          <td className="text-left">Doc.No :</td>
                          <td>00122022002</td>
                          <td className="text-left">Del. Date:</td>
                          <td>01122022</td>
                        </tr>
                        <tr>
                          <td className="text-left">Ref. D/O No :</td>
                          <td>1</td>
                          <td className="text-left">Total Q'ty:</td>
                          <td>64</td>
                        </tr>
                        <tr>
                          <td className="text-left">Invoice No :</td>
                          <td colSpan={3} className="text-left" />
                        </tr>
                        <tr>
                          <td className="text-left">CUSTOMER NAME :</td>
                          <td colSpan={3} className="text-left">SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)</td>
                        </tr>
                        <tr>
                          <td className="text-left">ADDRESS :</td>
                          <td colSpan={3} className="text-left">700/867 Moo 3 Amata Nakhon Industrial Estate, <br />Tambon Nong Ka Kha, District, Panthong District, <br />Chon Buri 20160</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td colSpan={checkColumn.length} className="no-space-td clear-border-bottom">
                  <table className="clear-border-cell-bottom clear-border-cell-left table-fixed no-border-space h-full">
                    <thead>
                      <tr>
                        <td colSpan={checkColumn.length} className="fs-9 bold clear-border-top clear-border-right">
                          รายการตรวจเช็คเรื่องยนต์ก่อนส่ง
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {
                          checkColumn.map((m, i) =>
                            <td key={i + '_check_column'} style={{ width: '10pt' }} className="no-space-td clear-border-bottom"><div className="rtl" style={{ height: '80pt', marginBottom: '-20pt' }}>{m}</div></td>,
                          )
                        }
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </thead>
            <tbody className="no-space">
              <tr className="bold no-space">
                <td style={{ width: '20pt' }}>ITEM</td>
                <td style={{ width: '40pt' }}>PALLET NO.</td>
                <td style={{ width: '50pt' }}>MODEL NAME</td>
                <td style={{ width: '30pt' }}>MODEL CODE</td>
                <td style={{ width: '30pt' }}>SERIAL NO.</td>
                {
                  checkColumn.map((m, i) =>
                    <td key={i + '_column'} style={{ width: '10pt' }} className="clear-border-top" />,
                  )
                }
              </tr>
              {
                [...Array(64).keys()].map((row, i) =>
                  <tr key={i + '_row_data'}>
                    <td className="bold">{row + 1}</td>
                    {i % 4 === 0 && <td rowSpan={4} className="fs-9 bold">40-831</td>}
                    <td>D1803-M-DI-E_TS5T</td>
                    <td>1J65813000</td>
                    <td>BNW7201</td>
                    {
                      checkColumn.map((column, j) =>
                        i % 4 === 0 && <td key={j + '_check_column'} rowSpan={4} />,
                      )
                    }
                  </tr>,
                )
              }
            </tbody>
          </table>
        </div>
        <div className="section" style={{ marginTop: '12pt' }}>
          <div className="gird-table-contaniner fs-9">
            <div className="div1 bold text-center"> ตารางบันทึกสิ่งผิดปกติ</div>
            <div className="div2 bold text-center"> การแก้ไข</div>
            <div className="div3 flex items-center">
              <div className="text-left bold">
                <div>O = ปรกติ</div>
                <div>X = ผิดปรกติ</div>
              </div>
            </div>
            <div className="div4"> </div>
            <div className="div5 text-center"> ผู้ตรวจเช็ค</div>
            <div className="div6"> test</div>
            <div className="div7"> test</div>
          </div>
        </div>
        <div className="section" style={{ marginTop: '12pt' }}>
          <table className="fs-9">
            <colgroup>
              <col style={{ width: '33%' }} />
              <col style={{ width: '33%' }} />
              <col style={{ width: '33%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="text-left">
                  <div>
                    <div className="flex justify-between">
                      <div>Prepare by: </div>
                      <div className="bold">KET</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Date: </div>
                      <div>test</div>
                    </div>
                  </div>
                </td>
                <td className="text-left">
                  <div>
                    <div className="flex justify-between">
                      <div>Deliverned by: </div>
                      <div className="bold">SNS</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Date: </div>
                      <div>test</div>
                    </div>
                  </div>
                </td>
                <td className="text-left">
                  <div>
                    <div className="flex justify-between">
                      <div>Receive by: </div>
                      <div className="bold">KET</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Date: </div>
                      <div>test</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-left">
                  <div className="flex justify-between">
                    <div>Start Time: </div>
                    <div className="bold">.........</div>
                  </div>
                </td>
                <td className="text-left">
                  <div className="flex justify-between">
                    <div>Start Time: </div>
                    <div className="bold">.........</div>
                  </div>
                </td>
                <td className="text-left">
                  <div className="flex justify-between">
                    <div>Start Time: </div>
                    <div className="bold">.........</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PDFFormat2
