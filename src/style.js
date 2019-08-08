import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    margin: 0;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
    background-color: white;
    height: 100%;
    overflow: hidden !important;
  }

  #app {
    /* background: #272822; */
    min-height: 100%;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  /* hide logo */
  .bjs-container > a {
    display: none;
  }

  .djs-minimap {
    right: 280px !important;
  }
`
