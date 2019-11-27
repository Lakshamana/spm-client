const LOGIN_VALIDITY_MILLIS = 1000 * 60 * 60 * 24
const REMEMBER_ME_LOGIN_VALIDITY_MILLIS = 2592000000

export default function({ store, redirect, route }) {
  const auth = store.state.auth
  const exp = auth.lastLogin
    ? REMEMBER_ME_LOGIN_VALIDITY_MILLIS
    : LOGIN_VALIDITY_MILLIS
  const lastLoginElapsed = Date.now() - auth.lastLoginDate
  if (!auth.user || !auth.token || lastLoginElapsed > exp) {
    redirect(`/login?to=${btoa(route.fullPath)}`)
  }
}
