import { forwardRef, useState } from 'react'
import Barcode, { Options } from 'react-barcode'

export interface ILoadingSubmit {
  serial_no: string
  model_code: string
  model_name: string
  gross_weight: string
  net_weight: string
  country_name: string
}
export interface IMultipleBarcode {
  barcodes: ILoadingSubmit[]
  gross_weight: string
  net_weight: string
  country_name: string
}

interface Props {
  content: IMultipleBarcode
}

const MultipleBarcode = forwardRef<HTMLDivElement, Props>(({ content }, ref) => {
  const [barcodeOption] = useState<Options>({
    width: 0.6,
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
        <div className='text-center'>{content.country_name}</div>
        <div className='barcode-wrapper flex flex-wrap' style={{ rowGap: '0.5cm' }}>
          {content.barcodes.map((m: any) => (
            <div className='flex flex-col items-center justify-center w-50 ' style={{ gap: '0.4cm' }} key={m.internal_pallet_no}>
              <Barcode value={m.serial_no || '-'} {...barcodeOption} />
              <div className='no-line-height'>{m.serial_no || '-'}</div>
              <div className='no-line-height'>{m.model_code || '-'}</div>
              <div className='no-line-height'>{m.model_name || '-'}</div>
            </div>
          ))}
        </div>
        <div className='flex justify-center' style={{ gap: '0.3cm', marginTop: '0.2cm' }}>
          <div>NW:{content.net_weight}</div>
          <div>GW:{content.gross_weight}-</div>
        </div>
      </div>
    </>
  )
})

export default MultipleBarcode
