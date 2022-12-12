import PDFFormat1 from '@/components/Pdf/PDFFormat1'
import PDFFormat2 from '@/components/Pdf/PDFFormat2'
import withAuth from '@/components/withAuth'
import { Box } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {}

export type TFormId = number | string | string[]

const PreviewDocumentWithId = ({ }: Props) => {
    const [formShow, setFormShow] = useState<TFormId>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [render, setRender] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query
        // codes using router.query
        console.log('id : ', id);
        console.log('id : ', router.query);

        const fetchData = async () => {
            setLoading(true)
            const pm = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 1000);
            })
            await pm
            setFormShow(id || "1")
            setLoading(false)
            setRender(true)
        }
        fetchData()
    }, [router.isReady]);

    function renderContent() {
        if (render) {
            if (formShow === "1") {
                return <PDFFormat1></PDFFormat1>
            } else if (formShow === "2") {
                return <PDFFormat2></PDFFormat2>
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            {/* <Box sx={{ textAlign: 'center', margin: '1rem' }}>Page ID: {id}</Box> */}
            {loading && <div>Loading...</div>}
            <>{renderContent()}</>
        </>
    )
}

export default PreviewDocumentWithId
