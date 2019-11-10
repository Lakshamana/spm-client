import { makeServices } from '@/service/serviceMaker'

export default ({ $axios }, inject) => {
  inject('service', makeServices($axios))
}
