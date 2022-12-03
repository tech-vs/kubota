import { RootState } from '@/store/store'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PeopleIcon from '@mui/icons-material/People'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Stack, Tooltip } from '@mui/material'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
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

  const role = useSelector((state: RootState) => state.user.role)

  const operatorItems = [
    {
      name: 'Scan (Packing)',
      icon: <SummarizeIcon />,
      pathName: '/scan-packing',
      onClickAction: () => router.push('/scan-packing')
    },
    {
      name: 'Scan (Loading)',
      icon: <SummarizeIcon />,
      pathName: '/scan-loading',
      onClickAction: () => router.push('/scan-loading')
    }
  ]
  const items = [
    {
      name: 'Check Sheet Issuing (Packing)',
      icon: <SummarizeIcon />,
      pathName: '/packing',
      onClickAction: () => router.push('/packing')
    },
    {
      name: 'Check Sheet (Loading)',
      icon: <SummarizeIcon />,
      pathName: '/loading',
      onClickAction: () => router.push('/loading')
    },
    {
      name: 'Import Stop Shipment',
      icon: <FileUploadIcon />,
      pathName: '/import',
      onClickAction: () => router.push('/import')
    },
    {
      name: 'Tracking Pallet',
      icon: <LocalShippingIcon />,
      pathName: '/tracking',
      onClickAction: () => router.push('/tracking')
    }
  ]
  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <Stack direction='row'>
          <Image
            src='/img/kubota-icon.jpg'
            layout='fixed'
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            width={160}
            height={50}
            objectFit='contain'
            alt='logo'
            style={{ marginLeft: '20px' }}
          />
          <IconButton onClick={() => onDrawerClose()}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Stack>
      </DrawerHeader>
      {role == 'Manager' || role == 'Administrator' ? <Divider /> : ''}
      <List>
        {role == 'Manager' || role == 'Administrator'
          ? items.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ display: 'block' }}
                onClick={item.onClickAction}
                style={router.pathname === item.pathName ? { background: '#fcf2dc' } : {}}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {/* disable hover when drawer open */}
                    <Tooltip title={item.name} disableHoverListener={open} placement='right-start'>
                      {item.icon}
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))
          : ''}
      </List>
      {role == 'Operator' ? <Divider /> : ''}
      <List>
        {role == 'Operator'
          ? operatorItems.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ display: 'block' }}
                onClick={item.onClickAction}
                style={router.pathname === item.pathName ? { background: '#fcf2dc' } : {}}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {/* disable hover when drawer open */}
                    <Tooltip title={item.name} disableHoverListener={open} placement='right-start'>
                      {item.icon}
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))
          : ''}
      </List>
      {role == 'Manager' ? <Divider /> : ''}
      <List>
        {role == 'Manager'
          ? ['Management Approve'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  onClick={() => router.push('/approval')}
                  style={router.pathname === '/approval' ? { background: '#fcf2dc' } : {}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {/* disable hover when drawer open */}
                    <Tooltip title={text} disableHoverListener={open} placement='right-start'>
                      <PeopleIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))
          : ''}
      </List>
      {role == 'Administrator' ? <Divider /> : ''}
      <List>
        {role == 'Administrator'
          ? ['User Management'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  onClick={() => router.push('/user')}
                  style={router.pathname === '/user' ? { background: '#fcf2dc' } : {}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {/* disable hover when drawer open */}
                    <Tooltip title={text} disableHoverListener={open} placement='right-start'>
                      <PeopleIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))
          : ''}
      </List>
    </Drawer>
  )
}
