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
import { mapState } from 'vuex'
import Editor from '@/components/Editor'

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

  computed: {
    ...mapState({
      processId: state => state.editor.currentProcess
    })
  },

  watch: {
    processId(val) {
      console.log('New Value:', val)
    }
  },

  created() {
    if (this.processId) {
      this.$axios
        .get(`/api/processes/xml/${this.processId}`)
        .then(({ data }) => {
          console.log(data)
          this.$refs.wrapper.setXmlValue(data)
        })
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
