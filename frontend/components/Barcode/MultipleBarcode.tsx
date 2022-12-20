import { forwardRef, useState } from 'react'
import Barcode, { Options } from 'react-barcode'

interface Props {
  content: {
    barcodes: {
      internal_pallet_no: string
      doc_no: string
      model_name: string
    }[],
    country_name: string
  }
}

const MultipleBarcode = forwardRef<HTMLDivElement, Props>(({ content }, ref) => {
  const [barcodeOption] = useState<Options>({
    width: 0.8,
    height: 34,
    displayValue: false,
    textMargin: 0,
    margin: 0,
    fontSize: 8
  })

  return (
    <>
      <div ref={ref} className='barcode-page' data-size='3x3'>
        <div className='text-center'>
          <img src='/img/kubota-icon.jpg' width='50%' style={{ marginTop: '0.4cm' }} alt='kubota' />
        </div>
        <div className='text-center'>THAILAND</div>
        <div className='barcode-wrapper flex flex-wrap' style={{ rowGap: '0.2cm' }}>
          {content.barcodes.map((m: any) => (
            <div className='flex flex-col items-center justify-center w-50 ' style={{ gap: '0.2cm' }} key={m.internal_pallet_no}>
              <Barcode value={ m.internal_pallet_no || '-' } {...barcodeOption} />
              <div className='no-line-height'>{ m.internal_pallet_no || '-' }</div>
              <div className='no-line-height'>{ m.doc_no || '-' }</div>
              <div className='no-line-height'>{ m.model_name || '-' }</div>
            </div>
          ))}
        </div>
        <div className='flex justify-center' style={{ gap: '0.3cm', marginTop: '0.2cm' }}>
          <div>NW: -</div>
          <div>GW: -</div>
        </div>
      </div>
    </>
  )
})

export default MultipleBarcode
