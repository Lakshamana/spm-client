export const errorHandler = {
  methods: {
    handle(e) {
      console.log(JSON.stringify(e))
      const message = e.response.data.userMessage || ''
      this.$buefy.toast.open({
        message,
        type: 'is-danger'
      })
    }
  }
}
