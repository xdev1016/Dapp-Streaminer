import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: futura;
    src: url(/fonts/futura/futura.ttf);
  }
  * {
    font-family: futura;
  }
  body {    
    background-image: url(/images/mainback.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
