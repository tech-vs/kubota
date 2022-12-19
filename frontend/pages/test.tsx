import MultipleBarcode from "@/components/Barcode/MultipleBarcode"
import SingleBarcode from "@/components/Barcode/SingleBarcode"
import { useState } from "react"

type Props = {}

const Test = ({ }: Props) => {
  const [barcode] = useState([])
  const [barcodes] = useState([1, 2, 3, 4])
  return <>
    <SingleBarcode></SingleBarcode>
    <MultipleBarcode content={barcodes} ></MultipleBarcode>
  </>
}

export default Test
