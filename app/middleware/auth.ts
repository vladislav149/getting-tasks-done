import {onAuthStateChanged} from 'firebase/auth'

export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) return

  const {$auth} = useNuxtApp()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  return new Promise(resolve => {
    onAuthStateChanged($auth, user => {
      if (authRequired && !user) {
        resolve('/login')
      } else if (!authRequired && user) {
        resolve('/')
      } else {
        resolve()
      }
    })
  })
})
