import PDFFormat1 from '@/components/Pdf/PDFFormat1'
import PDFFormat2 from '@/components/Pdf/PDFFormat2'
import { IPreviewDataFormat1, IPreviewDataFormat2, TDataPreview } from '@/models/preview.model'
import { checksheetPartList, previewDocLoading } from '@/services/serverServices'
import { Button, useTheme } from '@mui/material'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Props = {}

export type TFormId = number | string | string[]

const PreviewDocumentWithId = ({ accessToken }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const [formShow, setFormShow] = useState<TFormId>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)
  const [data, setData] = useState<TDataPreview | undefined>()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const { id, type } = router.query
    // codes using router.query
    console.log('id : ', router.query)

    const fetchData = async () => {
      setLoading(true)
      if (!id || !type) {
        // alert(`Not found 'type' of document or 'pallet id'`)
        MySwal.fire({
          text: `Not found 'type' of document or 'pallet id'`,
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
        return
      }
      let res
      if (type === '1') {
        res = await checksheetPartList(id.toString() || '', accessToken)
        setData(res)
      } else if (type === '2') {
        res = await previewDocLoading(id.toString() || '', accessToken)
        setData(res)
      }
      setFormShow(type || '1')
      setLoading(false)
      setRender(true)
    }
    fetchData()
  }, [router.isReady])

  function renderContent(content: TDataPreview | undefined) {
    if (!content) return <></>
    if (render) {
      if (formShow === '1') {
        return <PDFFormat1 content={content as IPreviewDataFormat1}></PDFFormat1>
      } else if (formShow === '2') {
        return <PDFFormat2 content={content as IPreviewDataFormat2}></PDFFormat2>
      }
    } else {
      return <></>
    }
  }

  function routeTo() {
    switch (formShow) {
      case '1':
        router.push('/packing')
        break
      case '2':
        router.push('/loading')
        break

      default:
        break
    }
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      <Button
        onClick={routeTo}
        variant='contained'
        color='primary'
        className='no-print'
        sx={{ position: 'fixed', left: '1rem', top: '1rem' }}
      >
        Done
      </Button>
      <>{renderContent(data)}</>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const cookies = cookie.parse(context.req.headers.cookie || '')
  const accessToken = cookies['access_token']

  return {
    props: {
      accessToken
    }
  }
}

export default PreviewDocumentWithId
