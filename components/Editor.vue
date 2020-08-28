<template>
  <div class="container is-fullwidth">
    <div class="columns is-centered">
      <div class="column is-12">
        <table class="table">
          <tr>
            <td>
              <div id="toolbar" ref="toolbar" />
            </td>
          </tr>
          <tr>
            <td id="graphContainer" ref="graphContainer" valign="top">
              <div id="graph">
                <center id="splash" ref="splash">
                  <img src="../assets/loading.gif" />
                </center>
              </div>
              <textarea id="xml" ref="xml"></textarea>
            </td>
          </tr>
        </table>

        <span class="source-ipt">
          <input id="source" ref="source" type="checkbox" />Source
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import mxGraphFactory from 'mxgraph-lakshamana'
import { mapState } from 'vuex'
import { errorHandler } from './mixins/errorHandler'
import {
  setEdgeType,
  setCellEntity,
  updateCell,
  createCell,
  getCell
} from '@/util/utils'
import { edgeTypes } from '@/service/helpers'
import { getXml } from '@/util/xml'

const mx = new mxGraphFactory()

export default {
  name: 'Editor',
  mixins: [errorHandler],
  props: {
    processModelId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      editor: undefined,
      validatees: {
        normal: {
          targets: [
            'normal',
            'decomposed',
            'artifactcon',
            'joincon',
            'branchandcon'
          ],
          constraints: {
            outgoingTo: {
              normal: 1,
              decomposed: 2
            },
            incomingFrom: {
              normal: 1,
              decomposed: 2
            }
          }
        },
        decomposed: {
          targets: [
            'normal',
            'decomposed',
            'artifactcon',
            'joincon',
            'branchandcon'
          ]
        },
        agent: {
          targets: ['normal', 'decomposed']
        },
        workgroup: {
          targets: ['normal', 'decomposed']
        },
        artifactcon: {
          targets: ['normal', 'decomposed']
        },
        join: {
          targets: ['normal', 'decomposed', 'joincon', 'branchandcon']
        },
        branch: {
          targets: ['normal', 'decomposed', 'joincon', 'branchandcon']
        }
      },
      validators: {
        targets: this.validateTargets,
        constraints: this.validateConstraints
      },
      targetSkip: ['targets'],
      sourceSkip: []
    }
  },

  computed: {
    ...mapState({
      processId: state => state.editor.currentProcess,
      token: state => state.auth.token,
      user: state => state.auth.user
    })
  },

  watch: {
    processModelId(val) {
      // if our graph is not empty
      const cells = Object.values(this.editor.graph.model.cells)
      if (cells.length > 2) {
        // remove first 2 cells
        this.syncGraphState(cells.slice(2))
      }
    }
  },

  created() {
    this.$addToWindow('mxGeometry', mx.mxGeometry)
    this.$addToWindow('mxGraph', mx.mxGraph)
    this.$addToWindow('mxCodec', mx.mxCodec)
    this.$addToWindow('mxGraphModel', mx.mxGraphModel)
    this.$addToWindow('mxUtils', mx.mxUtils)
    this.$addToWindow('mxClient', mx.mxClient)
    this.$addToWindow('mxEvent', mx.mxEvent)
    this.$addToWindow('mxEffects', mx.mxEffects)
    this.$addToWindow('mxEditor', mx.mxEditor)
    this.$addToWindow('mxObjectCodec', mx.mxObjectCodec)
    this.$addToWindow('mxPanningManager', mx.mxPanningManager)
    this.$addToWindow('mxVertexHandler', mx.mxVertexHandler)
    this.$addToWindow('mxGraphHandler', mx.mxGraphHandler)
    this.$addToWindow('mxGuide', mx.mxGuide)
    this.$addToWindow('mxEdgeHandler', mx.mxEdgeHandler)
    this.$addToWindow('mxConnectionHandler', mx.mxConnectionHandler)
    this.$addToWindow('mxXmlRequest', mx.mxXmlRequest)
    this.$addToWindow('mxImageExport', mx.mxImageExport)
    this.$addToWindow('mxSvgCanvas2D', mx.mxSvgCanvas2D)
    this.$addToWindow('mxConstants', mx.mxConstants)
    this.$addToWindow('mxXmlCanvas2D', mx.mxXmlCanvas2D)
    this.$addToWindow('mxImage', mx.mxImage)
    this.$addToWindow('mxResources', mx.mxResources)
    this.$addToWindow('mxStylesheet', mx.mxStylesheet)
    this.$addToWindow('mxDefaultToolbar', mx.mxDefaultToolbar)
    this.$addToWindow('mxToolbar', mx.mxToolbar)
    this.$addToWindow('mxMultiplicity', mx.mxMultiplicity)
    this.$addToWindow('onInit', this.onInit)
  },

  mounted() {
    this.editor = this.createEditor(getXml())
    if (this.processModelId)
      this.$service.processModel.subscribe(
        this.processModelId,
        this.user,
        data => {
          const graph = this.editor.graph
          console.log(data)
          const { operation } = data
          const cell = getCell(graph, data.objectId)
          console.log('cell:', cell)
          if (cell) {
            console.log('cell exists')
            if (operation === 'delete') {
              graph.removeCells([cell], cell.edges.length > 0)
              return
            }
            updateCell(cell, data, graph)
          } else {
            console.log('cell doesnt exists')
            if (operation === 'delete') return
            const enc = new mx.mxCodec()
            const node = enc.encode(graph.getModel())
            const xml = createCell(data, mx.mxUtils.getPrettyXml(node))
            console.log(xml)
            const doc = mx.mxUtils.parseXml(xml)
            const dec = new mx.mxCodec(doc)
            dec.decode(doc.documentElement, graph.getModel())
          }
        }
      )
  },

  beforeDestroy() {
    window.onbeforeunload = () => mx.mxResources.get('changesLost')
  },

  methods: {
    syncGraphState(cells) {},

    async onConnect(params) {
      const { cell, type, method, onfinally } = params
      try {
        const { data } = await this.$service[type][method](
          cell,
          this.processModelId
        )
        console.log(data)
        setCellEntity(cell, data.id)
      } catch (e) {
        this.handle(e)
        this.editor.graph.removeCells([cell], false)
        throw new Error('unsuccessful connection')
      } finally {
        onfinally()
      }
    },

    async onDelete(params) {
      console.log('ondelete')
      const { cell, type, method, forceUpdate } = params
      try {
        await this.$service[type][method](cell, forceUpdate)
      } catch (e) {
        this.handle(e)
        throw new Error('unsuccessful deletion')
      }
    },

    setXmlValue(xml) {
      const textNode = this.$refs.xml
      if (xml !== textNode.value) {
        textNode.value = xml
        const doc = mx.mxUtils.parseXml(textNode.value)
        const dec = new mx.mxCodec(doc)
        dec.decode(doc.documentElement, this.editor.graph.getModel())
      }
    },

    createEditor(config) {
      let editor = null

      const hideSplash = () => {
        const splash = this.$refs.splash

        if (splash != null) {
          try {
            mx.mxEvent.release(splash)
            mx.mxEffects.fadeOut(splash, 500, true)
          } catch (e) {
            this.loading = false
          }
        }
      }

      try {
        if (!mx.mxClient.isBrowserSupported()) {
          mx.mxUtils.error('Browser is not supported!', 200, false)
        } else {
          mx.mxObjectCodec.allowEval = true

          mx.mxEditor.prototype.getToolbar = function() {
            return this.toolbar.toolbar
          }

          const node = mx.mxUtils.parseXml(config).documentElement
          editor = new mx.mxEditor(node)
          mx.mxObjectCodec.allowEval = false

          editor.graph.createPanningManager = function() {
            const pm = new mx.mxPanningManager(this)
            pm.border = 30
            return pm
          }
          editor.graph.allowAutoPanning = false
          editor.graph.timerAutoScroll = true
          editor.validation = true

          editor.graph.multiplicities.push(
            new mx.mxMultiplicity(
              true,
              'joincon',
              null,
              null,
              0,
              1,
              ['normal', 'decomposed', 'joincon', 'branchandcon'],
              'Join must have at max 1 source node!',
              null
            ),
            new mx.mxMultiplicity(
              false,
              'branchandcon',
              null,
              null,
              0,
              1,
              ['normal', 'decomposed', 'joincon', 'branchandcon'],
              'Branch must have at max 1 target node!',
              null
            )
          )

          const funct = sender => {
            document.title = 'spm-client - ' + sender.getTitle()
          }

          editor.addListener(mx.mxEvent.OPEN, funct)

          funct(editor)

          editor.setStatus('mxGraph ' + mx.mxClient.VERSION)

          hideSplash()
        }
      } catch (e) {
        hideSplash()

        mx.mxUtils.alert('Cannot start application: ' + e.message)
        throw e
      }
      return editor
    },

    onInit(editor) {
      mx.mxVertexHandler.prototype.rotationEnabled = false

      mx.mxGraphHandler.prototype.guidesEnabled = true

      mx.mxGuide.prototype.isEnabledForEvent = evt => {
        return !mx.mxEvent.isAltDown(evt)
      }

      mx.mxEdgeHandler.prototype.snapToTerminals = true

      mx.mxGraph.prototype.setCellsResizable(true)

      const IMG_PATH = process.env.MXIMGPATH
      mx.mxConnectionHandler.prototype.connectImage = new mx.mxImage(
        `${IMG_PATH}/connector.gif`,
        16,
        16
      )

      editor.graph.setConnectable(true)

      const title = document.getElementById('title')

      if (title !== null) {
        const f = sender => {
          title.innerHTML = 'mxDraw - ' + sender.getTitle()
        }
        f(editor)
      }

      editor.graph.connectionHandler.addListener(
        mx.mxEvent.CONNECT,
        async (_, evt) => {
          const edge = evt.getProperty('cell')
          try {
            this.validateConnection(edge)
          } catch (e) {
            alert(`Can't create connection: "${e}"`)
            editor.graph.removeCells([edge], true)
          }
          editor.graph.validateGraph()
          setEdgeType(edge)
          const edgeType = edge.getAttribute('type')
          const finish = () => {
            mx.mxEvent.consume(evt)
          }
          try {
            if (edgeType === 'connector') {
              for (const sideNode of ['source', 'target']) {
                const type = edge[sideNode].getAttribute('type')
                if (edgeTypes[type] === 'connector') {
                  await this.onConnect({
                    cell: edge[sideNode],
                    type,
                    method: 'update'
                  })
                }
              }
            } else {
              await this.onConnect({
                cell: edge,
                type: edgeType,
                method: 'create',
                onfinally: finish,
                token: this.token
              })
            }
            await this.$service.processModel.publish(
              this.user,
              this.processModelId,
              edge
            )
          } catch (e) {
            console.log('catch')
          }
        }
      )

      editor.addListener(mx.mxEvent.BEFORE_ADD_VERTEX, (_, evt) => {
        const vtx = evt.getProperty('vertex')
        const vtxType = vtx.getAttribute('type')
        let ident
        if (!['reqagent', 'reqworkgroup'].includes(vtxType)) {
          ident = prompt(`Type in ${vtx.value.nodeName}'s ident:`)
          vtx.setAttribute('label', ident)
        }
        this.$service[vtxType]
          .create(vtx, this.processModelId)
          .then(async ({ data }) => {
            setCellEntity(vtx, data.id)
            await this.$service.coordinates.send(vtx, this.processId)
            console.log('publish new vertex')
            await this.$service.processModel.publish(
              this.user,
              this.processModelId,
              vtx
            )
          })
          .catch(err => {
            this.handle(err)
            editor.graph.removeCells([vtx], false)
          })
          .finally(() => mx.mxEvent.consume(evt))
      })

      editor.graph.addListener(mx.mxEvent.MOVE_CELLS, (_, evt) => {
        const cell = editor.graph.getSelectionCell()
        if (cell.edge) return
        let { x, y } = editor.graph.view.getState(cell).origin
        const dx = evt.getProperty('dx')
        const dy = evt.getProperty('dy')
        x += dx
        y += dy
        if (x < 0) {
          cell.geometry.x = 0
        }
        if (y < 0) {
          cell.geometry.y = 0
        }
        this.$service.coordinates
          .send(cell, this.processId)
          .then(async ({ data }) => {
            await this.$service.processModel.publish(
              this.user,
              this.processModelId,
              cell
            )
          })
          .finally(() => mx.mxEvent.consume(evt))
      })

      editor.graph.addListener(mx.mxEvent.REMOVE_CELLS, async (_, evt) => {
        const cells = evt.getProperty('cells')
        const edgesFirst = []

        // Put edge cells on first place
        for (const cell of cells) {
          if (cell.edge) edgesFirst.unshift(cell)
          else edgesFirst.push(cell)
        }

        console.log('edgesFirst:', edgesFirst)

        for (const cell of edgesFirst) {
          const cellType = cell.getAttribute('type')
          try {
            if (cellType === 'connector') {
              for (const sideNode of ['source', 'target']) {
                const type = cell[sideNode].getAttribute('type')
                if (cellType[type] === 'connector') {
                  await this.onDelete({
                    cell: cell[sideNode],
                    type,
                    method: 'update',
                    forceUpdate: true
                  })
                }
              }
            } else {
              await this.onDelete({
                cell,
                type: cellType,
                method: 'delete'
              })
            }
            await this.$service.processModel.publish(
              this.user,
              this.processModelId,
              cell,
              'delete'
            )
          } catch (e) {
            console.log('catch')
          }
        }
        mx.mxEvent.consume(evt)
      })

      const textNode = this.$refs.xml
      const graphNode = editor.graph.container
      const sourceInput = this.$refs.source
      sourceInput.checked = false

      const funct = editor => {
        if (sourceInput.checked) {
          graphNode.style.display = 'none'
          textNode.style.display = 'inline'

          const enc = new mx.mxCodec()
          const node = enc.encode(editor.graph.getModel())

          textNode.value = mx.mxUtils.getPrettyXml(node)
          textNode.originalValue = textNode.value
          textNode.focus()
        } else {
          graphNode.style.display = ''

          if (textNode.value !== textNode.originalValue) {
            const doc = mx.mxUtils.parseXml(textNode.value)
            const dec = new mx.mxCodec(doc)
            dec.decode(doc.documentElement, editor.graph.getModel())
          }

          textNode.originalValue = null

          if (mx.mxClient.IS_IE) {
            mx.mxUtils.clearSelection()
          }

          textNode.style.display = 'none'

          editor.graph.container.focus()
        }
      }

      editor.addAction('switchView', funct)

      mx.mxEvent.addListener(sourceInput, 'click', () => {
        editor.execute('switchView')
      })

      if (editor.urlImage != null) {
        const exportImage = editor => {
          const graph = editor.graph
          const scale = graph.view.scale
          const bounds = graph.getGraphBounds()

          const xmlDoc = mx.mxUtils.createXmlDocument()
          const root = xmlDoc.createElement('output')
          xmlDoc.appendChild(root)

          const xmlCanvas = new mx.mxXmlCanvas2D(root)
          xmlCanvas.translate(
            Math.floor(1 / scale - bounds.x),
            Math.floor(1 / scale - bounds.y)
          )
          xmlCanvas.scale(scale)

          const imgExport = new mx.mxImageExport()
          imgExport.drawState(
            graph.getView().getState(graph.model.root),
            xmlCanvas
          )

          const w = Math.ceil(bounds.width * scale + 2)
          const h = Math.ceil(bounds.height * scale + 2)
          const xml = mx.mxUtils.getXml(root)

          if (w > 0 && h > 0) {
            const name = 'export.png'
            const format = 'png'
            const bg = '&bg=#FFFFFF'

            new mx.mxXmlRequest(
              editor.urlImage,
              'filename=' +
                name +
                '&format=' +
                format +
                bg +
                '&w=' +
                w +
                '&h=' +
                h +
                '&xml=' +
                encodeURIComponent(xml)
            ).simulate(document, '_blank')
          }
        }
        editor.addAction('exportImage', exportImage)
      }
    },

    validateConnection(edge) {
      const roots = ['source', 'target']
      for (const rt of roots) {
        const t = this.getVertexType(edge[rt])
        const rules = this.validatees[t]
        for (const r in rules) {
          if (this[`${rt}Skip`].includes(r)) {
            continue
          }
          const validateFn = this.validators[r]
          try {
            validateFn(edge[rt], edge, rules[r])
          } catch (e) {
            throw e
          }
        }
      }
    },

    getVertexType(vertex) {
      return vertex.value.nodeName.toLowerCase()
    },

    validateTargets(vertex, edge, targets) {
      const isSrc = mx.mxUtils.equalEntries(vertex, edge.source)
      const other = isSrc ? 'target' : 'source'
      const targetType = this.getVertexType(edge[other])
      if (!targets.includes(targetType)) {
        throw new Error(`Invalid type ${targetType}`)
      }
    },

    validateConstraints(vertex, edge, allMult) {
      if (Object.keys(allMult).length) {
        const isSrc = mx.mxUtils.equalEntries(vertex, edge.source)
        const mult = allMult[isSrc ? 'outgoingTo' : 'incomingFrom']
        const other = isSrc ? 'target' : 'source'
        const me = isSrc ? 'source' : 'target'
        const neighborType = this.getVertexType(edge[other])
        const neighbors = vertex.edges.filter(
          e =>
            this.getVertexType(e[other]) === neighborType &&
            e[me].id === vertex.id
        )
        const occurences = neighbors.length
        if (occurences > mult[neighborType]) {
          throw new Error(
            `Failed to validate, max ${mult[neighborType]}, found ${occurences}`
          )
        }
      }
    }
  }
}
</script>

<style scoped>
#graphContainer {
  border: 1px solid black;
  background-color: #ededed;
}

#graph {
  overflow: auto;
  height: 55vh;
  width: 80vw;
  cursor: default;
}

#toolbar {
  height: auto;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid black;
  vertical-align: middle;
  width: fit-content;
  margin: 0 auto;
}

#xml {
  height: 55vh;
  width: 684px;
  display: none;
  border-style: none;
}

#splash {
  padding-top: 27vh;
}

.source-ipt {
  float: right;
  padding-right: 1.5em;
}

.table {
  margin-left: auto;
  margin-right: auto;
}
</style>
