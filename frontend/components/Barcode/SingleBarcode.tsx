import { forwardRef, useState } from 'react'
import Barcode, { Options } from 'react-barcode'
interface Props {
      content: {
        internal_pallet_no: string
        pallet: string
      }
}

const SingleBarcode = forwardRef<HTMLDivElement, Props>(({ content }: Props, ref) => {
    const [barcodeOption] = useState<Options>({
        width: 1.25,
        height: 34,
        displayValue: false,
        textMargin: 0,
        margin: 0,
        fontSize: 8,
    })

    return (
        <>
            {/* <button onClick={getDataImage}>getDataImage</button>
            <div style={{ background: 'red' }}>hello</div> */}
            <div className="barcode-page" data-size="3x1" ref={ref}>
                <div className='flex items-center justify-center flex-col h-full'
                    style={{ gap: '0.2cm' }}
                >
                    <Barcode value={content.pallet || '-'} {...barcodeOption} />
                    <div className='no-line-height'>{content.pallet || '-'}</div>
                    <div className='no-line-height'>{content.internal_pallet_no || '-'}</div>
                </div>
            </div>
        </>
    )
})

export default SingleBarcode
