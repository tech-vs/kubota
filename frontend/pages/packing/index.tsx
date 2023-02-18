import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import httpClient from '@/utils/httpClient'
import { alpha, Box, Button, Typography, useMediaQuery } from '@mui/material'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import { DataGrid, GridCellParams, gridClasses, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { ReactElement, useState, useMemo } from 'react'

type Props = {}

const ODD_OPACITY = 0.2

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}))
const Overall = ({ packingList }: any) => {
  const router = useRouter()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const isMobile = isSM || isMD || isXS

  const columns: GridColDef[] = [
    {
      field: 'internal_pallet_no',
      headerName: 'Internal Pallet No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'model_code',
      headerName: 'Model Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      type: 'string',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'model_name',
      headerName: 'Model Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'serial_no',
      headerName: 'Serial No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'country_code',
      headerName: 'Country Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'country_name',
      headerName: 'Country Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'distributor_code',
      headerName: 'Distributor Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'distributor_name',
      headerName: 'Distributor Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },

    // {
    //   field: 'blank',
    //   headerName: '',
    //   headerClassName: 'headerField',
    //   flex: 1
    // },
    {
      field: 'view',
      headerName: 'View',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <Button
            variant='contained'
            onClick={() => router.push(`/preview/${row.pallet_id}?type=1`)}
            sx={{ borderRadius: 25 }}
          >
            View
          </Button>
        )
      }
    }
  ]

  const [sortModel, setSortModel] = useState<GridSortModel>(
    [{
      field: 'internal_pallet_no',
      sort: 'desc',
    }],
  );

  return (
    <>
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
        <Typography variant='h5'>View Packing List</Typography>
      </Box>
      <Box
        sx={{
          height: 720,
          width: isMobile ? '100%' : 1270,
          '& .cold': {
            color: 'success.main'
          },
          '& .hot': {
            color: 'error.main'
          },
          '& .headerField': {
            fontSize: 12
          },
          '& .customerField': {
            backgroundColor: '#c7ddb5'
          },
          '& .cellField': {
            fontSize: 12
          }
        }}
      >
        <StripedDataGrid
          getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
          getRowId={packingList => packingList.serial_no}
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          rows={packingList}
          columns={columns}
          getCellClassName={(params: GridCellParams<string>) => {
            if (params.field === 'customer') {
              return 'customerField'
            }
            if (params.value == 'OK') {
              return 'cold'
            }
            if (params.value == 'Waiting') {
              return 'hot'
            }
            return ''
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          pageSize={12}
          rowsPerPageOptions={[12]}
          disableSelectionOnClick
          disableVirtualization
          disableExtendRowFullWidth
          disableIgnoreModificationsIfProcessingProps
          disableColumnSelector
        />
      </Box>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get(`/pallet/part-list/?packing_status=TRUE`)

  return {
    props: {
      packingList: response.data
    }
  }
}

Overall.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}
export default Overall
