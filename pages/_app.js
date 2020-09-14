import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'containers/App/GlobalStyles'
import * as theme from 'constants/theme'
import { wrapper } from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
