export default function({ store, redirect, route }) {
  const auth = store.state.auth
  console.log(route.fullPath)
  if (!auth.user || !auth.token) {
    redirect(`/login?to=${btoa(route.fullPath)}`)
  }
}
