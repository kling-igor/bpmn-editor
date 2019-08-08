import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

// const ContentStyle = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
// `

const WorkspaceStyle = styled.div`
  width: 100%;
  height: 100%;
`

const PropertiesPanelStyle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 260px;
  z-index: 10;
  border-left: 1px solid #ccc;
  overflow: auto;
  &:empty {
    display: none;
  }
  > .djs-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
`

// modeler.saveXML({ format: true }, function(err, xml) {
//   done(err, xml);
// });

export default ({ diagramXML }) => {
  const containerRef = useRef(null)
  const propsPanelRef = useRef(null)

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: containerRef.current,
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      keyboard: {
        bindTo: window
      },
      additionalModules: [minimapModule, propertiesPanelModule, propertiesProviderModule]
    })

    modeler.on('import.done', event => {
      const { error, warnings } = event

      if (error) {
        console.log('IMPORT ERROR:', error)
      }

      // access modeler components
      const canvas = modeler.get('canvas')
      // var overlays = this.BpmnModeler.get('overlays');

      canvas.zoom('fit-viewport')

      console.log('WARNING:', warnings)
    })

    modeler.importXML(diagramXML)

    return () => {
      modeler.destroy()
    }
  }, [diagramXML])

  return (
    <>
      <WorkspaceStyle ref={containerRef} />
      <PropertiesPanelStyle id="js-properties-panel" ref={propsPanelRef} />
    </>
  )
}
