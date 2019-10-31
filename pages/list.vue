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
                  {{ key }}: {{ value }}
                </p>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <b-button class="is-success open-btn">
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
import { removeMatching } from '@/util/utils'
export default {
  data() {
    return {
      isOpen: -1,
      items: []
    }
  },

  created() {
    const ref = this.$route.query.ref
    this.$axios.get(`/api/${ref}`).then(({ data }) => {
      this.items =
        data.length > 0
          ? data.map(i =>
              removeMatching(i, (attr, k) => {
                return typeof attr === 'object' || k === 'id'
              })
            )
          : []
    })
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
