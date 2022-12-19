import PDFFormat1 from '@/components/Pdf/PDFFormat1'
import PDFFormat2 from '@/components/Pdf/PDFFormat2'
import withAuth from '@/components/withAuth'
import { IPreviewDataFormat1, IPreviewDataFormat2, mockupData1, mockupData2, TDataPreview } from '@/models/preview.model'
import { checksheetPartList } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {}

export type TFormId = number | string | string[]

const PreviewDocumentWithId = ({ }: Props) => {
    const [formShow, setFormShow] = useState<TFormId>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [render, setRender] = useState<boolean>(false)
    const [data, setData] = useState<TDataPreview | undefined>()
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        const { id, type } = router.query
        // codes using router.query
        console.log('id : ', id);
        console.log('id : ', router.query);

        const fetchData = async () => {
            setLoading(true)
            if (!id || !type) {
                alert(`Not found 'type' of document or 'pallet id'`)
                return
            }
            const res = await checksheetPartList(id.toString() || '')
            setData(res)
            setFormShow(type || "1")
            setLoading(false)
            setRender(true)
        }
        fetchData()
    }, [router.isReady]);

    function renderContent(content: TDataPreview | undefined) {
        if (!content) return <></>
        if (render) {
            if (formShow === "1") {
                return <PDFFormat1 content={content as IPreviewDataFormat1}></PDFFormat1>
            } else if (formShow === "2") {
                return <PDFFormat2 content={content as IPreviewDataFormat2}></PDFFormat2>
            }
        } else {
            return <></>
        }
    }

    function routeTo() {
        switch (formShow) {
            case "1":
                router.push('/scan-packing')
                break;
            case "2":
                router.push('/scan-loading')
                break;

            default:
                break;
        }
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            <Button onClick={routeTo} variant="contained" color="primary" className="no-print" sx={{position: 'fixed', left: '1rem', top: '1rem'}}>
                Done
            </Button>
            <>{renderContent(data)}</>
        </>
    )
}

export default PreviewDocumentWithId
