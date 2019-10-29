<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <slot />
        </div>
      </div>
      <template v-if="useFooter">
        <footer class="card-footer">
          <div class="card-footer-item">
            <slot name="footer" />
          </div>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    useFooter: {
      type: Boolean,
      default: false
    }
  }
}
</script>
