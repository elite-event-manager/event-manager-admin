import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    overflow: hidden;
    
    min-height:  100vh;
    margin: 0;
    padding: 0;
    
    font-size: 16px;
    font-weight: 400;
    
    background-color: #F0F2F5;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* .ant-tree-show-line .ant-tree-switcher-line-icon {
    display: none;
  } */
`
