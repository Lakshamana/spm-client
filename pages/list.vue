<template>
  <div class="container">
    <div class="columns is-10 is-centered">
      <div class="column">
        <section class="section">
          <b-collapse
            v-for="(item, index) of items"
            :key="index"
            class="card"
            :open="isOpen === index"
            @open="isOpen = index"
          >
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
            >
              <p class="card-header-title">
                {{ item.ident }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <p v-for="(value, key) in item" :key="key">
                  <span v-if="key !== 'id'">{{ key }}: {{ value }} </span>
                </p>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <b-button
                      class="is-success open-btn"
                      :loading="loading"
                      @click="open(item.id)"
                    >
                      Open
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { errorHandler } from '@/components/mixins/errorHandler'
import { removeMatching } from '@/util/utils'
export default {
  mixins: [errorHandler],
  data() {
    return {
      isOpen: -1,
      items: [],
      loading: false
    }
  },

  computed: {
    ref() {
      return this.$route.query.ref
    }
  },

  created() {
    this.$axios.get(`/api/${this.ref}`).then(({ data }) => {
      this.items =
        data.length > 0
          ? data.map(i =>
              removeMatching(i, (attr, k) => typeof attr === 'object')
            )
          : []
    })
  },

  methods: {
    open(entityId) {
      this.loading = true
      this.$axios
        .get(`/api/${this.ref}/${entityId}`)
        .then(({ data }) => {
          this.loading = false
          this.$store.commit(
            'editor/setCurrentProcessModel',
            data.theProcessModel.id
          )
          this.$store.commit('editor/setCurrentProcess', data.id)
          this.$router.push('/')
        })
        .catch(this.handle)
    }
  }
}
</script>

<style>
.open-btn {
  float: right;
  margin: 10px;
  position: relative;
}
</style>
