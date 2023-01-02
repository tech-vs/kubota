import { IContentSingleBarcode } from '@/models/barcode.model'
import { forwardRef, useState } from 'react'
import Barcode, { Options } from 'react-barcode'
interface Props {
    content: IContentSingleBarcode
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
            <div className="barcode-page" data-size="3x1" ref={ref}>
                <div className='flex items-center justify-center flex-col h-full'
                    style={{ gap: '0.2cm' }}
                >
                    {
                        content.question_type === 'Export' && <>
                            <Barcode value={content.internal_pallet_no || '-'} {...barcodeOption} />
                            <div className='no-line-height'>{content.internal_pallet_no || '-'}</div>
                        </>
                    }
                    { 
                        content.question_type === 'Domestic' && <>
                            <Barcode value={content.internal_pallet_no || '-'} {...barcodeOption} />
                            <div className='no-line-height'>{content.internal_pallet_no || '-'}</div>
                            <div className='no-line-height'>{content.pallet_string || '-'}</div>
                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default SingleBarcode
