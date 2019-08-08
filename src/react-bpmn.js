import React, { Component } from 'react'
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

// bpmnModeler.saveXML({ format: true }, function(err, xml) {
//   done(err, xml);
// });

export default class ReactBpmn extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.propsPanelRef = React.createRef()
  }

  componentDidMount() {
    const container = this.containerRef.current

    this.BpmnModeler = new BpmnModeler({
      container,
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      keyboard: {
        bindTo: window
      },
      additionalModules: [minimapModule, propertiesPanelModule, propertiesProviderModule]
    })

    this.BpmnModeler.on('import.done', event => {
      const { error, warnings } = event

      if (error) {
        console.log('IMPORT ERROR:', error)
      }

      // access modeler components
      var canvas = this.BpmnModeler.get('canvas')
      // var overlays = this.BpmnModeler.get('overlays');

      canvas.zoom('fit-viewport')

      // return this.handleShown(warnings)

      console.log('WARNING:', warnings)
    })

    // this.fetchDiagram(url)
    this.BpmnModeler.importXML(this.props.diagramXML)
  }

  componentWillUnmount() {
    this.BpmnModeler.destroy()
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this

    if (props.diagramXML !== prevProps.diagramXML) {
      return this.BpmnModeler.importXML(props.diagramXML)
    }
  }

  // fetchDiagram(url) {
  //   this.handleLoading()

  //   fetch(url)
  //     .then(response => response.text())
  //     .then(text => this.setState({ diagramXML: text }))
  //     .catch(err => this.handleError(err))
  // }

  // handleLoading() {
  //   const { onLoading } = this.props

  //   if (onLoading) {
  //     onLoading()
  //   }
  // }

  // handleError(err) {
  //   const { onError } = this.props

  //   if (onError) {
  //     onError(err)
  //   }
  // }

  // handleShown(warnings) {
  //   const { onShown } = this.props

  //   if (onShown) {
  //     onShown(warnings)
  //   }
  // }

  render() {
    return (
      <>
        <WorkspaceStyle ref={this.containerRef} />
        <PropertiesPanelStyle id="js-properties-panel" ref={this.propsPanelRef} />
      </>
    )
  }
}
