<template>
  <div>
    <div class="columns is-mobile">
      <div id="mainActions">
        <button
          v-for="action in actions"
          :key="action"
          @click="execute(action)"
        >
          {{ action }}
        </button>
      </div>
    </div>
    <Editor ref="wrapper" />
  </div>
</template>

<script>
import Editor from '~/components/Editor'

export default {
  name: 'HomePage',

  components: {
    Editor
  },
  data() {
    return {
      actions: [
        'group',
        'ungroup',
        'cut',
        'copy',
        'paste',
        'delete',
        'undo',
        'redo',
        'print',
        'show',
        'exportImage'
      ]
    }
  },

  methods: {
    execute(action) {
      this.$refs.wrapper.editor.execute(action)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#mainActions {
  width: auto;
  padding-top: 1.5em;
  margin: 0 auto;
}

#selectActions {
  width: auto;
  padding-left: 54px;
  padding-bottom: 4px;
}

#zoomActions {
  width: 100%;
  padding-left: 54px;
  padding-top: 4px;
}

#headerimg {
  overflow: hidden;
}
</style>
