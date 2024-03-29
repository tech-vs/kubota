import Header from '@/components/Layouts/Header'
import Menu from '@/components/Layouts/Menu'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import Container from '@mui/material/Container';
import * as React from 'react'
import withAuth from '../withAuth'

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

type LayoutProps = {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} onDrawerOpen={() => setOpen((op => !op))} />
      <Menu open={open} onDrawerClose={() => setOpen(false)} />
      <Box component='main' sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, p: { xs: 1, md: 3 } }}>
        <DrawerHeader />
        <Container sx={{ px: { xs: 0 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default withAuth(Layout)
