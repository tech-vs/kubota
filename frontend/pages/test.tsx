import MultipleBarcode from "@/components/Barcode/MultipleBarcode"
import SingleBarcode from "@/components/Barcode/SingleBarcode"
import { toPng } from "html-to-image"
import { useCallback, useEffect, useRef, useState } from "react"

type Props = {}

const Test = ({ }: Props) => {
  const [barcode] = useState({
    internal_pallet_no: "22120001"
  })
  const [barcodes] = useState(
    {
      barcodes: [
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
      ],
      country_name: 'test',
      net_weight: 'test',
      gross_weight: 'tes',
    })

  const siggleBarcodeRef = useRef<HTMLDivElement>(null)
  const multipleBarcodeRef = useRef<HTMLDivElement>(null)

  // for printer only
  function setupPrinter() {
    const BP = window.BrowserPrint
    //Get the default device from the application as a first step. Discovery takes longer to complete.
    BP.getDefaultDevice("printer", function (device: any) {
      console.log(device);
    }, function (error: any) {
      console.log(error);
    })
  }

  const getDataImage = useCallback(async () => {
    if (siggleBarcodeRef.current) {
      console.dir(siggleBarcodeRef.current);

      // callbackDataUrl(await toPng(ref.current))
      console.log(await toPng(siggleBarcodeRef.current))
    }
  }, [siggleBarcodeRef?.current])

  const getDataImage2 = useCallback(async () => {
    if (multipleBarcodeRef.current) {
      console.dir(multipleBarcodeRef.current);

      // callbackDataUrl(await toPng(ref.current))
      console.log(await toPng(multipleBarcodeRef.current))
    }
  }, [multipleBarcodeRef?.current])

  useEffect(() => {
    setupPrinter()
    console.dir(siggleBarcodeRef.current)
  }, [siggleBarcodeRef?.current])

  return <>
    <button onClick={() => getDataImage()}>get image 1</button>
    <button onClick={() => getDataImage2()}>get image 2</button>
    <SingleBarcode content={barcode} ref={siggleBarcodeRef}></SingleBarcode>
    <MultipleBarcode content={barcodes} ref={multipleBarcodeRef}></MultipleBarcode>
  </>
}

export default Test
