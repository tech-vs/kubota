import { RootState } from '@/store/store'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PeopleIcon from '@mui/icons-material/People'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Stack, Tooltip, useMediaQuery } from '@mui/material'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// set icon
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';


import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

type MenuProp = {
  open: boolean
  onDrawerClose: () => void
}

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme()
  const router = useRouter()

  const isSM = useMediaQuery(theme.breakpoints.down('sm'))

  const role = useSelector((state: RootState) => state.user.role)
  console.log('fewfw', role)
  const colorPrimary = theme.palette.primary.main

  const operatorItems = [
    {
      name: 'Scan (Packing)',
      icon: (color = 'inherit') => <AddCircleRoundedIcon color={color} />,
      pathName: '/scan-packing',
      onClickAction: () => router.push('/scan-packing')
    },
    {
      name: 'Scan (Loading)',
      icon: (color = 'inherit') => <LocalShippingRoundedIcon color={color} />,
      pathName: '/scan-loading',
      onClickAction: () => router.push('/scan-loading')
    },
    {
      name: 'Repack',
      icon: (color = 'inherit') => <LoopRoundedIcon color={color} />,
      pathName: '/repack',
      onClickAction: () => router.push('/repack')
    }
  ]
  const items = [
    {
      name: 'Check Sheet Issuing (Packing)',
      icon: (color = 'inherit') => <AssessmentRoundedIcon color={color} />,
      pathName: '/packing',
      onClickAction: () => router.push('/packing')
    },
    {
      name: 'Check Sheet (Loading)',
      icon: (color = 'inherit') => <AssessmentRoundedIcon color={color} />,
      pathName: '/loading',
      onClickAction: () => router.push('/loading')
    },
    {
      name: 'Import Stop Shipment',
      icon: (color = 'inherit') => <FileDownloadRoundedIcon color={color} />,
      pathName: '/import',
      onClickAction: () => router.push('/import')
    }
    // {
    //   name: 'Tracking Pallet',
    //   icon: <LocalShippingIcon />,
    //   pathName: '/tracking',
    //   onClickAction: () => router.push('/tracking')
    // }
  ]
  return (
    <Drawer variant='permanent' open={open === false}>
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction='row'>
          <Image
            src='/img/kubota-icon.jpg'
            layout='fixed'
            // sizes='(max-width: 768px) 100vw,
            //   (max-width: 1200px) 50vw,
            //   33vw'
            width={160}
            height={40}
            objectFit='contain'
            alt='logo'
          // style={{ marginLeft: '20px' }}
          />
          {/* <IconButton onClick={() => onDrawerClose()}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </Stack>
      </DrawerHeader>
      {role == 'Manager' || role == 'Administrator' ? <Divider /> : ''}
      {role == 'Manager' || role == 'Administrator' ? (
        <List>
          {items.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                background: router.pathname === item.pathName ? '#f1faff' : undefined,
                color: router.pathname === item.pathName ? 'primary.main' : undefined
              }}
              onClick={item.onClickAction}
            // style={router.pathname === item.pathName ? { background: '#fcf2dc' } : {}}
            >
              <Tooltip title={item.name} disableHoverListener={open === false} placement='right-start'>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    whiteSpace: open ? '' : 'normal'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3
                    }}
                  >
                    {/* disable hover when drawer open */}
                    {typeof item.icon === 'function' && router.pathname === item.pathName ? item.icon('primary') : item.icon()}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      ) : (
        ''
      )}
      {role == 'Operator' ? <Divider /> : ''}
      {role == 'Operator' && (
        <List>
          {operatorItems.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                display: 'block',
                background: router.pathname === item.pathName ? '#f1faff' : undefined,
                color: router.pathname === item.pathName ? 'primary.main' : undefined
              }}
              onClick={item.onClickAction}
            >
              <Tooltip title={item.name} disableHoverListener={open === false} placement='right'>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    whiteSpace: open ? '' : 'normal'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3
                    }}
                  >
                    {/* disable hover when drawer open */}
                    {typeof item.icon === 'function' && router.pathname === item.pathName ? item.icon('primary') : item.icon()}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )
      }
      {role == 'Manager' ? <Divider /> : ''}
      {
        role == 'Manager' && (
          <List>
            {['Management Approve'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  background: router.pathname === '/approval' ? '#f1faff' : undefined,
                  color: router.pathname === '/approval' ? 'primary.main' : undefined
                }}
              >
                <Tooltip title={text} disableHoverListener={open === false} placement='right'>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      whiteSpace: open ? '' : 'normal'
                    }}
                    onClick={() => router.push('/approval')}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3
                      }}
                    >
                      {/* disable hover when drawer open */}
                      <AssignmentTurnedInRoundedIcon color={router.pathname === '/approval' ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        )
      }
      {role == 'Administrator' ? <Divider /> : ''}
      {
        role == 'Administrator' && (
          <List>
            {['User Management'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  background: router.pathname === '/user' ? '#f1faff' : undefined,
                  color: router.pathname === '/user' ? 'primary.main' : undefined
                }}
              >
                <Tooltip title={text} disableHoverListener={open === false} placement='right'>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      whiteSpace: open ? '' : 'normal'
                    }}
                    onClick={() => router.push('/user')}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center'
                      }}
                    >
                      {/* disable hover when drawer open */}
                      <ManageAccountsRoundedIcon color={router.pathname === '/user' ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        )
      }
    </Drawer >
  )
}
