import Layout from '@/components/Layouts/Layout'
import { scanPallet } from '@/services/serverServices'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
type Props = {}

type scanProps = {
  palletNo: string
  partSeq01: string
  partSeq02: string
  partSeq03: string
  partSeq04: string
}

const Scan = ({}: Props) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const router = useRouter()
  const [deEx, setDeEx] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [scan, setScan] = useState<scanProps>({
    palletNo: '',
    partSeq01: '',
    partSeq02: '',
    partSeq03: '',
    partSeq04: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const palletNoRef = useRef<HTMLInputElement>(null)
  const partSeq01Ref = useRef<HTMLInputElement>(null)
  const [selectUnitIsOpen, setSelectUnitIsOpen] = useState(false)
  const [rerenderUnitBlur, setRerenderUnitBlur] = useState(0)

  useEffect(() => {
    if (palletNoRef.current && deEx === 'Domestic') {
      console.log(palletNoRef.current)
      setTimeout(() => {
        palletNoRef.current?.click()
        palletNoRef.current?.focus()
      }, 500)
    }
  }, [deEx])

  useEffect(() => {
    if (selectUnitIsOpen === false) {
      setTimeout(() => {
        partSeq01Ref.current?.click()
        partSeq01Ref.current?.focus()
      }, 500)
    }
  }, [selectUnitIsOpen])

  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
    return (
      <Form>
        <Box
          component='main'
          sx={{
            display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
            mb: 3,
            position: 'relative',
            height: '30px',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h5'>Scan Packing</Typography>
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 2,
                position: 'relative',
                height: '55px',
                justifyContent: 'center'
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={deEx}
                  sx={{
                    gap: '1rem',
                    justifyContent: 'center'
                  }}
                >
                  <FormControlLabel
                    value='Domestic'
                    sx={{
                      padding: '1rem',
                      margin: '1rem 0',
                      border: 'solid 1px',
                      borderColor: '#dedede',
                      borderRadius: '1rem',
                      color: '#121212',
                      '&:has(.Mui-checked)': {
                        boxShadow: 1,
                        color: 'primary.main',
                        borderColor: 'primary.main'
                      },
                      minWidth: '110px',
                      height: '1rem'
                    }}
                    control={
                      <Radio
                        size='small'
                        onChange={e => {
                          setDeEx(e.target.value)
                          setFieldValue('deEx', e.target.value)
                        }}
                        sx={{
                          color: '#dedede',
                          '&.Mui-checked': {
                            color: 'primary.main'
                          }
                        }}
                      />
                    }
                    label='Domestic'
                  />
                  <FormControlLabel
                    value='Export'
                    sx={{
                      padding: '1rem',
                      margin: '1rem 0',
                      border: 'solid 1px',
                      borderColor: '#dedede',
                      borderRadius: '1rem',
                      color: '#121212',
                      '&:has(.Mui-checked)': {
                        boxShadow: 1,
                        color: 'primary.main',
                        borderColor: 'primary.main'
                      },
                      minWidth: '110px',
                      height: '1rem'
                    }}
                    control={
                      <Radio
                        size='small'
                        onChange={e => {
                          setDeEx(e.target.value)
                          setFieldValue('deEx', e.target.value)
                          setSelectUnitIsOpen(true)
                        }}
                        sx={{
                          color: '#dedede',
                          '&.Mui-checked': {
                            color: 'primary.main'
                          }
                        }}
                      />
                    }
                    label='Export'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {deEx == 'Domestic' || deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 5,
                  position: 'relative',
                  height: '55px'
                }}
              >
                <FormControl fullWidth required sx={{ minWidth: 120, minHeight: 60 }}>
                  <InputLabel id='demo-simple-select-required-label'>Select...</InputLabel>
                  <Select
                    labelId='demo-simple-select-required-label'
                    id='demo-simple-select-required'
                    label='Unit *'
                    value={unit}
                    open={selectUnitIsOpen}
                    onChange={(e: SelectChangeEvent<string>) => {
                      e.preventDefault()
                      setUnit(e.target.value)
                      setFieldValue('unit', e.target.value)
                    }}
                    onOpen={() => {
                      setSelectUnitIsOpen(true)
                    }}
                    onClose={() => {
                      setTimeout(() => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur()
                        }
                      }, 0)
                      setSelectUnitIsOpen(false)
                    }}
                  >
                    <MenuItem value={'0173'}>Unit 1</MenuItem>
                    <MenuItem value={'0473'}>Unit 4</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            {deEx == 'Export' || deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  inputRef={palletNoRef}
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Pallet No.'
                  variant='outlined'
                  value={scan.palletNo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setScan({ ...scan, palletNo: e.target.value })
                    setFieldValue('scan.palletNo', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            {deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  inputRef={partSeq01Ref}
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Part Seq01'
                  variant='outlined'
                  value={scan.partSeq01}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setScan({ ...scan, partSeq01: e.target.value })
                    setFieldValue('scan.partSeq01', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            {deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Part Seq02'
                  variant='outlined'
                  value={scan.partSeq02}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setScan({ ...scan, partSeq02: e.target.value })
                    setFieldValue('scan.partSeq02', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            {deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Part Seq03'
                  variant='outlined'
                  value={scan.partSeq03}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setScan({ ...scan, partSeq03: e.target.value })
                    setFieldValue('scan.partSeq03', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            {deEx == '' ? (
              ''
            ) : (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Part Seq04'
                  variant='outlined'
                  value={scan.partSeq04}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setScan({ ...scan, partSeq04: e.target.value })
                    setFieldValue('scan.partSeq04', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 5,
                position: 'relative'
              }}
            >
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <Box
                sx={{
                  display: { xs: 'flex' },
                  position: { xs: 'fixed', md: 'relative' },
                  bottom: { xs: '0' },
                  left: { xs: '0' },
                  width: { xs: '100%' },
                  zIndex: { xs: '1201' },
                  padding: { xs: '4px' },
                  gap: { xs: '4px' },
                  height: { xs: '60px', md: 'auto' },
                  justifyContent: 'center',
                  background: { xs: '#fff' }
                }}
              >
                <Button
                  variant='contained'
                  size='large'
                  color='primary'
                  type='submit'
                  sx={{ marginRight: 1, width: { xs: '50%', md: '200px' }, height: '100%' }}
                >
                  Ok
                </Button>
                <Button
                  variant='outlined'
                  size='large'
                  onClick={() => {
                    // window.location.reload()
                    setDeEx('')
                    setScan({
                      palletNo: '',
                      partSeq01: '',
                      partSeq02: '',
                      partSeq03: '',
                      partSeq04: ''
                    })
                  }}
                  color='secondary'
                  sx={{ marginRight: 1, width: { xs: '50%', md: '200px' }, height: '100%' }}
                >
                  Clear
                </Button>
              </Box>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
            </Box>
          </CardContent>
        </Card>
      </Form>
    )
  }
  return (
    <Formik
      initialValues={{ deEx: '', unit: '', palletNo: '', partSeq01: '', partSeq02: '', partSeq03: '', partSeq04: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setLoading(true)
          setTimeout(() => {
            setSucess(true)
            setLoading(false)
          }, 4000)

          let data_domestic = {
            pallet_skewer: scan.palletNo,
            part_list: [
              {
                prod_seq: '1',
                id_no: scan.partSeq01
              },
              {
                prod_seq: '2',
                id_no: scan.partSeq02
              },
              {
                prod_seq: '3',
                id_no: scan.partSeq03
              },
              {
                prod_seq: '4',
                id_no: scan.partSeq04
              }
            ],
            question_type: values.deEx
          }
          let data_export = {
            part_list: [
              {
                prod_seq: '1',
                id_no: scan.partSeq01
              },
              {
                prod_seq: '2',
                id_no: scan.partSeq02
              },
              {
                prod_seq: '3',
                id_no: scan.partSeq03
              },
              {
                prod_seq: '4',
                id_no: scan.partSeq04
              }
            ],
            question_type: values.deEx,
            nw_gw: values.unit
          }
          setScan({
            palletNo: '',
            partSeq01: '',
            partSeq02: '',
            partSeq03: '',
            partSeq04: ''
          })
          setDeEx('')
          setUnit('')
          if (
            scan.partSeq01 == scan.partSeq02 ||
            scan.partSeq01 == scan.partSeq03 ||
            scan.partSeq01 == scan.partSeq04 ||
            scan.partSeq02 == scan.partSeq03 ||
            scan.partSeq02 == scan.partSeq04 ||
            scan.partSeq03 == scan.partSeq04
          ) {
            MySwal.fire({
              text: 'ID No. ซ้ำกันใน Pallet',
              position: 'top',
              confirmButtonColor: theme.palette.primary.main
            })
          } else {
            const response = await scanPallet(values.deEx === 'Domestic' ? data_domestic : data_export)
            router.push(`/scan-packing/checksheet1?id=${response.pallet_id}`)
          }

          setSubmitting(false)
        } catch (error: any) {
          if (error.response) {
            MySwal.fire({
              text: JSON.stringify(error.response.data),
              position: 'top',
              confirmButtonColor: theme.palette.primary.main
            })
            console.error(error)
            // alert(JSON.stringify(error.response.data))
          }
        }
      }}
    >
      {props => showForm(props)}
    </Formik>
  )
}

Scan.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Scan
