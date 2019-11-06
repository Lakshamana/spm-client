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
            <a class="navbar-item" @click="openModal = true">
              New Process
            </a>
            <nuxt-link class="navbar-item" to="/list?ref=processes">
              List Processes
            </nuxt-link>
            <b-modal :active.sync="openModal">
              <form @submit.prevent="onSubmit">
                <card title="Create new process">
                  <b-field label="Ident">
                    <b-input v-model="newProcessForm.ident"></b-input>
                  </b-field>
                  <b-button class="is-success" native-type="submit">
                    Submit
                  </b-button>
                </card>
              </form>
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
import { mapState } from 'vuex'
import Card from '@/components/Card'
import { errorHandler } from '@/components/mixins/errorHandler'

export default {
  components: {
    Card
  },

  mixins: [errorHandler],

  data() {
    return {
      newProcessForm: {
        ident: ''
      },
      openModal: false
    }
  },

  computed: {
    ...mapState({
      processModelId: state => state.editor.currentProcessModel,
      graphicDescriptionId: state => state.editor.currentGraphicDescription
    })
  },

  methods: {
    onSubmit() {
      this.$axios
        .post('/api/processes', {
          ident: this.newProcessForm.ident
        })
        .then(({ data }) => {
          console.log(data)
          const { id, theGraphicDescription } = data.theProcessModel
          if (!this.processModelId) {
            this.$store.commit('editor/setCurrentProcessModel', id)
            this.$store.commit(
              'editor/setCurrentGraphicDescription',
              theGraphicDescription.id
            )
          }
          if (this.$route.path === '/list') {
            location.reload()
          }
        })
        .catch(this.handle)
        .finally(() => {
          this.openModal = false
          this.newProcessForm.ident = ''
        })
    }
  }
}
</script>
