import { IPreviewDataFormat2 } from '@/models/preview.model';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  content: IPreviewDataFormat2
}
function splitList(inputList: any[]) {
  const outputList = [];
  
  while (inputList.length > 0) {
    outputList.push(inputList.splice(0, 20));
  }

  return outputList;
}

const PDFFormat2 = ({ content }: Props) => {
  // filter section === 3 only
  // console.log(content.pallet_list.length)
  const [contentPerPage,setContentPerPage] = useState<any[][]>([])
  useEffect(() => {
    const splitResult = splitList(content.pallet_list)
    setContentPerPage(splitResult)
  }, [content])
  // console.log(contentPerPage);
  
  const headerQuestion = useMemo(() => content.question_list.filter(f => f.section === 3), [content.question_list])

  return (
    <>
    {contentPerPage.map((item,index) => (     
        <div key={index} className='page' data-size='A4'>
        <div className='text-center fs-17 bold'>Kubota Engine (Thailand) Co., Ltd.</div>
        <div className='fs-12'>Address : 360 Moo3, Phanom Sarakarm, Chachoengsao 24120 Thailand</div>
        <div className='fs-12'>Tel: 038-855136-40 ,Fax : 038-855145</div>
        <div className='section'>
          <table className='fs-6 h-full table-fixed'>
            <colgroup>
              <col style={{ width: '20pt' }} />
              <col style={{ width: '40pt' }} />
              <col style={{ width: '50pt' }} />
              <col style={{ width: '30pt' }} />
              <col style={{ width: '30pt' }} />
              {headerQuestion.map((m, i) => (
                <col key={i + '_column'} style={{ width: '10pt' }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <td colSpan={5} className='clear-border-top clear-border-left' style={{ height: '100%' }}>
                  <div className='flex flex-col justify-between' style={{ height: '100%' }}>
                    <table className='clear-border-table clear-border-cell fs-9'>
                      <tbody>
                        <tr>
                          <td colSpan={4} className='bold fs-12'>
                            Packing list
                          </td>
                        </tr>
                        <tr>
                          <td className='text-left'>Doc.No :</td>
                          <td>{content.doc_no || ''}</td>
                          <td className='text-left'>Del. Date:</td>
                          <td>{content.delivery_date || ''}</td>
                        </tr>
                        <tr>
                          <td className='text-left'>Ref. D/O No :</td>
                          <td>{content.ref_do_no || ''}</td>
                          <td className='text-left'>Total Q'ty:</td>
                          <td>{content.total_qty || ''}</td>
                        </tr>
                        <tr>
                          {content.question_type.toLowerCase() === 'domestic' ? (
                            <td className='text-left'>Invoice No :</td>
                          ) : content.question_type.toLowerCase() === 'export' ? (
                            <td className='text-left'>Container /Seal No. :</td>
                          ) : (
                            <></>
                          )}
                          <td colSpan={3} className='text-left'>
                            {content.invoice_no || ''}
                          </td>
                        </tr>
                        <tr>
                          <td className='text-left' style={{ width: '60pt' }}>
                            CUSTOMER NAME :
                          </td>
                          <td colSpan={3} className='text-left'>
                            {content.customer_name || ''}
                          </td>
                        </tr>
                        <tr>
                          <td className='text-left'>ADDRESS :</td>
                          <td colSpan={3} className='text-left'>
                            {content.address || ''}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td colSpan={headerQuestion.length} className='no-space-td clear-border-bottom'>
                  <table
                    className='clear-border-cell-bottom clear-border-cell-left table-fixed no-border-space h-full'
                    style={{ width: 'calc(100% + 1pt)' }}
                  >
                    <thead>
                      <tr>
                        <td colSpan={headerQuestion.length} className='fs-9 bold clear-border-top clear-border-right'>
                          รายการตรวจเช็คเรื่องยนต์ก่อนส่ง
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {headerQuestion.map((m, i) => (
                          <td
                            key={i + '_check_column_1'}
                            style={{ width: '10pt' }}
                            className='no-space-td clear-border-bottom'
                          >
                            <div className='rtl' style={{ height: '80pt', marginBottom: '0pt' }}>
                              {m.text}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </thead>
            <tbody className='no-space'>
              <tr className='bold no-space'>
                <td style={{ width: '20pt' }}>ITEM</td>
                <td style={{ width: '40pt' }}>PALLET NO.</td>
                <td style={{ width: '50pt' }}>MODEL NAME</td>
                <td style={{ width: '30pt' }}>MODEL CODE</td>
                <td style={{ width: '30pt' }}>SERIAL NO.</td>
                {headerQuestion.map((m, i) => (
                  <td key={i + '_column'} style={{ width: '10pt' }} className='clear-border-top' />
                ))}
              </tr>
              {
                // render group 4
                item.map((row, i) =>
                  // render row
                  [...Array(4).keys()].map(indexOfData => {
                    return (
                      <tr key={i + indexOfData + '_row_data_body'}>
                        <td className='bold'>{i * 4 + (indexOfData + 1)}</td>
  
                        {indexOfData % 4 === 0 && (
                          <td rowSpan={4} className='fs-9 bold'>
                            {content.question_type.toLowerCase() === 'export' ? (
                              <>{row.pallet.internal_pallet_no || ''}</>
                            ) : content.question_type.toLowerCase() === 'domestic' ? (
                              <>
                                {row.pallet.pallet || ''}-{row.pallet.skewer || ''}
                              </>
                            ) : (
                              <></>
                            )}
                          </td>
                        )}
                        <td>{row.part_list[indexOfData].model_name || ''}</td>
                        <td>{row.part_list[indexOfData].model_code || ''}</td>
                        <td>{row.part_list[indexOfData].serial_no || ''}</td>
                        {headerQuestion.map(
                          (h, hIndex) =>
                            indexOfData % 4 === 0 && (
                              <td key={i + indexOfData + hIndex + 'header_status'} rowSpan={4}>
                                {row.question_list[indexOfData].status ? 'O' : 'X'}
                              </td>
                            )
                        )}
                      </tr>
                    )
                  })
                )
              }
            </tbody>
          </table>
        </div>
        <div className='section' style={{ marginTop: '12pt' }}>
          <div className='gird-table-contaniner fs-9'>
            <div className='div1 bold text-center'> ตารางบันทึกสิ่งผิดปกติ</div>
            <div className='div2 bold text-center'> การแก้ไข</div>
            <div className='div3 flex items-center'>
              <div className='text-left bold'>
                <div>O = ปรกติ</div>
                <div>X = ผิดปรกติ</div>
              </div>
            </div>
            <div className='div4'></div>
            <div className='div5 text-center'> ผู้ตรวจเช็ค</div>
            <div className='div6'></div>
            <div className='div7'></div>
          </div>
        </div>
        {content.question_type.toLowerCase() === 'domestic' ? (
          <div className='section' style={{ marginTop: '12pt' }}>
            <table className='fs-9'>
              <colgroup>
                <col style={{ width: '33%' }} />
                <col style={{ width: '33%' }} />
                <col style={{ width: '33%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <td className='text-left'>
                    <div>
                      <div className='flex justify-between'>
                        <div>Prepare by: </div>
                        <div className='bold'>{content.prepare_by?.name || ''}</div>
                      </div>
                      <div className='flex justify-between'>
                        <div>Date: </div>
                        <div>{content.prepare_by?.date || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className='text-left'>
                    <div>
                      <div className='flex justify-between'>
                        <div>Deliverned by: </div>
                        <div className='bold'>{content.deliverned_by?.name || ''}</div>
                      </div>
                      <div className='flex justify-between'>
                        <div>Date: </div>
                        <div>{content.deliverned_by?.date || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className='text-left'>
                    <div>
                      <div className='flex justify-between'>
                        <div>Receive by: </div>
                        <div className='bold'>{content.receive_by?.name || ''}</div>
                      </div>
                      <div className='flex justify-between'>
                        <div>Date: </div>
                        <div>{content.receive_by?.date || ''}</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-left'>
                    <div className='flex justify-between'>
                      <div>Start Time: </div>
                      <div className='bold'>{content.prepare_by?.start_time || ''}</div>
                    </div>
                  </td>
                  <td className='text-left'>
                    <div className='flex justify-between'>
                      <div>Start Time: </div>
                      <div className='bold'>{content.deliverned_by?.start_time || ''}</div>
                    </div>
                  </td>
                  <td className='text-left'>
                    <div className='flex justify-between'>
                      <div>Start Time: </div>
                      <div className='bold'>{content.receive_by?.start_time || ''}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : content.question_type.toLowerCase() === 'export' ? (
          <div className='section' style={{ marginTop: '12pt' }}>
            <table className='fs-9'>
              <colgroup>
                {[...Array(8).keys()].map((c,index) => {
                  return <col key={index} style={{ width: '12.5%' }} />
                })}
              </colgroup>
              <tbody>
                <tr>
                  {[
                    'Prepare by: Leader / subLeader',
                    `${content.leader_approve_name}`,
                    'Picking by: Clerk',
                    `${content.clerk_approve_name}`,
                    'Check by: PC-Officer',
                    `${content.engineer_approve_name}`,
                    'Approved by: Manager',
                    `${content.manager_approve_name}`
                  ].map((c,index) => {
                    return (
                      <td key={index} className='text-center'>
                        <div>{c}</div>
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  {[...Array(8).keys()].map((c,index) => {
                    return (
                      <td  key={index} className='text-center'>
                        <div>{c % 2 === 0 ? 'Date' : ''}</div>
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>


    ))}
    

      
    </>
  )
}

export default PDFFormat2
