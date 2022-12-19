import { useEffect, useState } from 'react'
import Barcode, { Options } from 'react-barcode'

interface Props {
    content: any
}

const MultipleBarcode = ({ content }: Props) => {
    const [barcodeOption, setBarcodeOption] = useState<Options>({
        width: 0.8,
        height: 34,
        displayValue: false,
        textMargin: 0,
        margin: 0,
        fontSize: 8,
    })
    return (
        <>
            <div className="barcode-page" data-size="3x3">
                <div className='text-center'>
                    <img src="/img/kubota-icon.jpg" width="50%" style={{ marginTop: '0.4cm' }} alt="kubota" />
                </div>
                <div className='text-center'>USA</div>
                <div className='barcode-wrapper flex flex-wrap' style={{ rowGap: '0.2cm' }}>
                    {
                        content.map(m =>
                            <div className='flex flex-col items-center justify-center w-50 '
                                style={{ gap: '0.2cm' }} key={m}
                            >
                                <Barcode value={'YYMM0000'} {...barcodeOption} />
                                <div className='no-line-height'>YYMM0000</div>
                                <div className='no-line-height'>2022102040832</div>
                                <div className='no-line-height'>D1803-N0DU0E0TS5T</div>
                            </div>
                        )
                    }
                </div>
                <div className='flex justify-center' style={{ gap: '0.3cm', marginTop: '0.2cm' }}>
                    <div>NW-660</div>
                    <div>GW:745</div>
                </div>
            </div>
        </>
    )
}

export default MultipleBarcode
