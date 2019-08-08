import React, { Component } from 'react'
import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js'

export default class ReactBpmn extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const container = this.containerRef.current

    this.bpmnViewer = new BpmnJS({ container })

    this.bpmnViewer.on('import.done', event => {
      const { error, warnings } = event

      if (error) {
        console.log('IMPORT ERROR:', error)
      }

      this.bpmnViewer.get('canvas').zoom('fit-viewport')

      // return this.handleShown(warnings)

      console.log('WARNING:', warnings)
    })

    // this.fetchDiagram(url)
    this.bpmnViewer.importXML(this.props.diagramXML)
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy()
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this

    if (props.diagramXML !== prevProps.diagramXML) {
      return this.bpmnViewer.importXML(props.diagramXML)
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
