export type TTypeSingleBarcode = 'Export' | 'Domestic'

export interface IContentSingleBarcode {
    internal_pallet_no?: string
    pallet_string?: string
    question_type: TTypeSingleBarcode
}
  