import MultipleBarcode from "@/components/Barcode/MultipleBarcode"
import SingleBarcode from "@/components/Barcode/SingleBarcode"
import { useEffect, useState } from "react"

type Props = {}

const Test = ({ }: Props) => {
  const [barcode] = useState([])
  const [barcodes] = useState([1, 2, 3, 4])

  function setupPrinter() {
    const BP = window.BrowserPrint
    //Get the default device from the application as a first step. Discovery takes longer to complete.
    BP.getDefaultDevice("printer", function (device) {
      console.log(device);
    }, function (error) {
      console.log(error);
    })
  }

  useEffect(() => {
    setupPrinter()
  }, [])

  return <>
    <SingleBarcode></SingleBarcode>
    <MultipleBarcode content={barcodes} ></MultipleBarcode>
  </>
}

export default Test
