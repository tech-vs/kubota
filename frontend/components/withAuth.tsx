import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

// import { isAuthenticatedSelector } from '@/store/slice/userSlice'
import { isAuthenticatedSelector } from '@/store/slice/userSlice'
import { RootState } from '@/store/store'
import { isClient } from '@/utils/commonUtil'

// eslint-disable-next-line react/display-name
const withAuth = (WrappedComponent: FC) => (props: any) => {
  // this hoc only supports client side rendering.
  if (isClient()) {
    const router = useRouter()
    const { route } = router
    const isAuthenticated = useSelector(isAuthenticatedSelector)
    const isAuthenticating = useSelector((state: RootState) => state.user.isAuthenticating)
    const role = useSelector((state: RootState) => state.user.role)
    console.log(isAuthenticated)

    // is fetching session (eg. show spinner)
    if (isAuthenticating) {
      return null
    }
    // // If user is not logged in, return signin component
    if (route !== '/login') {
      if (!isAuthenticated) {
        router.push(`/login`)
        return null
      } else if (route == '/') {
        if (role == 'Operator') {
          router.push('/scan-packing')
        } else if (role == 'Manager') {
          router.push('/approval')
        } else if (role == 'Administrator') {
          router.push('/user')
        }
        return null
      }
    } else {
      if (isAuthenticated) {
        if (role == 'Operator') {
          router.push('/scan-packing')
        } else if (role == 'Manager') {
          router.push('/approval')
        } else if (role == 'Administrator') {
          router.push('/user')
        }

        return null
      }
    }
    // If user is logged in, return original component
    return <WrappedComponent {...props} />
  }

  return null
}

export default withAuth
