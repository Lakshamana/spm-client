export default (_, inject) => {
  inject('addToWindow', (key, value) => (window[key] = value))
}
