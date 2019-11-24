export default function({ store, redirect, route }) {
  const auth = store.state.auth
  if (!auth.user || !auth.token) {
    redirect(`/login?to=${btoa(route.fullPath)}`)
  }
}
