import React, { PureComponent } from 'react'
import { GlobalStyle } from './style'

import ReactBpmn from './react-bpmn'

import bpmnXML from './diagramm'

export default class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <ReactBpmn diagramXML={bpmnXML} />>
      </>
    )
  }
}
