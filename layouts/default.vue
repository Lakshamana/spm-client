<template>
  <div>
    <nav
      class="navbar header has-shadow is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-start">
        <a class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">Processes</div>
          <div class="navbar-dropdown">
            <a href="#" class="navbar-item" @click="openModal = true">
              + New Process
            </a>
            <b-modal :active.sync="openModal">
              <card title="New Process">
                ola
              </card>
            </b-modal>
          </div>
        </a>
      </div>
    </nav>

    <section>
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {
    Card
  },

  data() {
    return {
      newProcessForm: {
        ident: ''
      },
      openModal: false
    }
  }
}
</script>
