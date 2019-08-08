import React, { Component } from 'react'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'

export default class ReactBpmn extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const container = this.containerRef.current

    this.BpmnModeler = new BpmnModeler({
      container,
      keyboard: {
        bindTo: window
      },
      additionalModules: [minimapModule]
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
    return <div style={{ width: '100%', height: '100%' }} ref={this.containerRef} />
  }
}
