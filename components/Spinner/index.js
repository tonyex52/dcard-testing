import styled, { keyframes } from 'styled-components'
import { LoaderAlt } from '@styled-icons/boxicons-regular'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default styled(LoaderAlt)`
  animation-name: ${spin};
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`
