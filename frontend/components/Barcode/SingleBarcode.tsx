import { useEffect, useState } from 'react'
import Barcode, { Options } from 'react-barcode'

interface Props {
    //   content: IPreviewDataFormat1
}

const SingleBarcode = ({ content }: Props) => {
    const [barcodeOption, setBarcodeOption] = useState<Options>({
        width: 1.25,
        height: 34,
        displayValue: false,
        textMargin: 0,
        margin: 0,
        fontSize: 8,
    })

    return (
        <>
            <div className="barcode-page" data-size="3x1">
                <div className='flex items-center justify-center flex-col h-full'
                    style={{ gap: '0.2cm' }}
                >
                    <Barcode value={'YYMM0000'} {...barcodeOption} />
                    <div className='no-line-height'>YYMM0000</div>
                    <div className='no-line-height'>2022102040832</div>
                </div>
            </div>
        </>
    )
}

export default SingleBarcode
