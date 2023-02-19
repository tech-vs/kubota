import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// import { isAuthenticatedSelector } from '@/store/slice/userSlice'
import { isAuthenticatedSelector } from '@/store/slice/userSlice'
import { RootState } from '@/store/store'
import { isClient } from '@/utils/commonUtil'

// eslint-disable-next-line react/display-name
const withAuth = (WrappedComponent: any) => (props: any) => {
  // this hoc only supports client side rendering.
  if (isClient()) {
    const router = useRouter()
    const { route } = router
    const isAuthenticated = useSelector(isAuthenticatedSelector)
    const isAuthenticating = useSelector((state: RootState) => state.user.isAuthenticating)
    const role = useSelector((state: RootState) => state.user.role)
    console.log(role)

    // is fetching session (eg. show spinner)
    if (isAuthenticating) {
      return <></>
    }
    // // If user is not logged in, return signin component
    if (route !== '/login') {
      if (!isAuthenticated) {
        router.push(`/login`)
        return <></>
      } else if (route == '/') {
        if (role == 'Operator') {
          router.push('/scan-packing')
        } else if (role == 'Manager' || role == 'Engineer' || role == 'Clerk' || role == 'Leader') {
          router.push('/approval')
        } else if (role == 'Administrator') {
          router.push('/user')
        }
        return <></>
      }
    } else {
      if (isAuthenticated) {
        if (role == 'Operator') {
          router.push('/scan-packing')
        } else if (role == 'Manager' || role == 'Engineer' || role == 'Clerk' || role == 'Leader') {
          router.push('/approval')
        } else if (role == 'Administrator') {
          router.push('/user')
        }

        return <></>
      }
    }
    // If user is logged in, return original component
    return <WrappedComponent {...props} />
  }

  return <></>
}

export default withAuth
