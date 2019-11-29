export default function({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
  })

  // $axios.onResponse(response => {
  //   console.log('response:', response)
  //   if (
  //     response.config.url.endsWith('/api/sequences') &&
  //     response.status === 201
  //   ) {
  //     console.log('meant to resolve')
  //     return Promise.resolve(response)
  //   }
  // })
}
