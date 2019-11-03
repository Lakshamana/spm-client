/* eslint max-len: 0 */
const IMG_PATH = process.env.MXIMGPATH

const xml = `<mxEditor defaultGroup="group" defaultEdge="connector">
<add as="onInit">
  <![CDATA[
  function ()
  {
    onInit(this);
  }
]]>
</add>
<ui>
  <add as="graph" element="graph" />
  <add as="toolbar" element="toolbar" />
</ui>
<Array as="templates">
  <add as="group">
    <Group label="" href="">
      <mxCell vertex="1" style="group" connectable="0" />
    </Group>
  </add>
  <add as="connector">
    <Connector label="" href="">
      <mxCell edge="1">
        <mxGeometry as="geometry" relative="1" />
      </mxCell>
    </Connector>
  </add>
  <add as="normal">
    <Normal label="" href="">
      <mxCell vertex="1" style="normal">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </Normal>
  </add>
  <add as="decomposed">
    <Decomposed label="" href="">
      <mxCell vertex="1" style="decomposed">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </Decomposed>
  </add>
  <add as="reqagent">
    <ReqAgent label="" href="">
      <mxCell vertex="1" style="reqagent">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </ReqAgent>
  </add>
  <add as="reqworkgroup">
    <ReqWorkGroup label="">
      <mxCell vertex="1" style="reqworkgroup">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </ReqWorkGroup>
  </add>
  <add as="artifact">
    <Artifact label="">
      <mxCell vertex="1" style="artifact_empty">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </Artifact>
  </add>
  <add as="join">
    <JoinCon label="">
      <mxCell vertex="1" style="join_or_end_end">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </JoinCon>
  </add>
  <add as="branch">
    <BranchCon label="">
      <mxCell vertex="1" style="branch_or_end_end">
        <mxGeometry as="geometry" width="50" height="50" />
      </mxCell>
    </BranchCon>
  </add>
</Array>
<mxGraph as="graph" allowLoops="1" dropEnabled="1">
  <add as="isAutoSizeCell">
    <![CDATA[
    function(cell)
    {
      return mxUtils.isNode(this.model.getValue(cell), 'text');
    }
  ]]>
  </add>
  <add as="isSwimlane">
    <![CDATA[
    function (cell)
    {
      return mxUtils.isNode(this.model.getValue(cell), 'container');
    }
  ]]>
  </add>
  <add as="getTooltipForCell">
    <![CDATA[
    function(cell)
    {
      var label = cell.getAttribute('label');
      var style = cell.getStyle();

      return ((label != null) ? ('<b>' + label +
          '</b> (' + cell.getId() + ')<br>') : '') +
          ((style != null) ? ('<br>Style: ' + style + '<br>') : '') +
          'Connections: ' + cell.getEdgeCount()+
          '<br>Children: ' + cell.getChildCount();
    }
  ]]>
  </add>
  <add as="convertValueToString">
    <![CDATA[
    function(cell)
    {
      return cell.getAttribute('label');
    }
  ]]>
  </add>
  <mxStylesheet as="stylesheet">
    <add as="straightConnector">
      <add as="shape" value="connector" />
      <add as="endArrow" value="classic" />
      <add as="edgeStyle" value="straightEdgeStyle" />
    </add>
    <add as="swimlane">
      <add as="shape" value="swimlane" />
      <add as="shadow" value="0" />
      <add as="startSize" value="23" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="top" />
      <add as="strokeColor" value="#EEEEEE" />
      <add as="fillColor" value="#D4D4D4" />
    </add>
    <add as="group">
      <add as="shape" value="rectangle" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="strokeColor" value="gray" />
      <add as="dashed" value="1" />
    </add>
    <add as="normal">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/normal_blank.gif" />
    </add>
    <add as="decomposed">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/decomposed_blank.gif" />
    </add>
    <add as="reqagent">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/agent.png" />
    </add>
    <add as="reqworkgroup">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/group.png" />
    </add>
    <add as="artifact_empty">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/artifact_empty.png" />
    </add>
    <add as="artifact_full">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/artifact_full.png" />
    </add>
    <add as="branch_or_end_end">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_or_end_end.gif" />
    </add>
    <add as="branch_or_start_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_or_start_start.gif" />
    </add>
    <add as="branch_or_end_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_or_end_start.gif" />
    </add>
    <add as="branch_and_end_end">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_and_end_end.gif" />
    </add>
    <add as="branch_and_start_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_and_start_start.gif" />
    </add>
    <add as="branch_and_end_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/branch_and_end_start.gif" />
    </add>
    <add as="join_or_end_end">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_or_end_end.gif" />
    </add>
    <add as="join_or_start_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_or_start_start.gif" />
    </add>
    <add as="join_or_end_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_or_end_start.gif" />
    </add>
    <add as="join_and_end_end">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_and_end_end.gif" />
    </add>
    <add as="join_and_start_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_and_start_start.gif" />
    </add>
    <add as="join_and_end_start">
      <add as="shape" value="image" />
      <add as="perimeter" value="rectanglePerimeter" />
      <add as="fontSize" value="10" />
      <add as="align" value="center" />
      <add as="verticalAlign" value="middle" />
      <add as="image" value="${IMG_PATH}/spm/join_and_end_start.gif" />
    </add>
  </mxStylesheet>
  <mxGraphModel as="model">
    <add as="valueForCellChanged">
      <![CDATA[
      function(cell, value)
      {
        var previous = null;

        if (value == null || isNaN(value.nodeType))
        {
          previous = cell.value.getAttribute('label');

          if (value == null)
          {
            cell.value.removeAttribute('label');
          }
          else
          {
            cell.setAttribute('label', value);
          }
        }
        else
        {
          previous = cell.value;
          cell.value = value;
        }

        return previous;
      }
    ]]>
    </add>
    <root>
      <Diagram label="" href="" id="0">
        <mxCell />
      </Diagram>
      <Layer label="Default Layer" id="1">
        <mxCell parent="0" />
      </Layer>
    </root>
  </mxGraphModel>
</mxGraph>
<mxDefaultToolbar as="toolbar">
  <add as="Lock" mode="lock" icon="${IMG_PATH}/spm/Lock.png">
    <![CDATA[
    editor => {
      if (editor.getToolbar().selectedMode.title === 'Lock') {
        const nodeList = editor.getToolbar().container.children
        const selectedNode = Object.values(nodeList).find(node => node.title === 'Lock')
        if (selectedNode) {
          const b = editor.graph.isEnabled()
          if (Object.keys(editor.graph.model.cells).length > 2) {
            editor.graph.setEnabled(!b)
            const imageName = b ? 'Unlock' : 'Lock'
            selectedNode.src = '${IMG_PATH}/spm/' + imageName + '.png'
          }
        }
      }
    }
  ]]>
  </add>
  <add as="Normal" template="normal" icon="${IMG_PATH}/spm/normal.png" />
  <add as="Decomposed" template="decomposed" icon="${IMG_PATH}/spm/decomposed.png" />
  <add as="ReqAgent" template="reqagent" icon="${IMG_PATH}/spm/agent.png" />
  <add as="ReqWorkGroup" template="reqworkgroup" icon="${IMG_PATH}/spm/group.png" />
  <add as="Artifact" template="artifact" icon="${IMG_PATH}/spm/artifact_full.png" />
  <add as="JoinCon" template="join" icon="${IMG_PATH}/spm/join.png" />
  <add as="BranchCon" template="branch" icon="${IMG_PATH}/spm/branch.png" />
</mxDefaultToolbar>
</mxEditor>`

export function getXml() {
  return xml
}
