import { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import debounce from 'lodash/debounce'
import { INPUT_DEBOUNCE_TIMES } from 'constants/common'
import Input from 'components/Input'
import {
  ROW_LABEL_FIRST,
  ROW_INPUT_FIRST,
  COLUMN_LABEL_FIRST,
  COLUMN_INPUT_FIRST,
} from './constants'

const Container = styled.div`
  display: flex;

  flex-direction: ${({ direction }) => direction};
  ${({ direction }) => {
    switch (direction) {
      case COLUMN_LABEL_FIRST:
      case COLUMN_INPUT_FIRST:
        return css`
          align-items: flex-start;
        `
      case ROW_LABEL_FIRST:
      case ROW_INPUT_FIRST:
      default:
        return css`
          align-items: center;
        `
    }
  }}
`
const Text = styled.div`
  flex: 0 0 auto;
  font-size: 18px;
  font-weight: bold;
`
const StyledInput = styled(Input)`
  ${({ direction }) => {
    switch (direction) {
      case ROW_INPUT_FIRST:
        return css`
          flex: 1 1 auto;
          margin-right: 5px;
        `
      case COLUMN_LABEL_FIRST:
        return css`
          width: 100%;
          flex: 0 0 auto;
          margin-top: 3px;
        `
      case COLUMN_INPUT_FIRST:
        return css`
          width: 100%;
          flex: 0 0 auto;
          margin-bottom: 3px;
        `
      case ROW_LABEL_FIRST:
      default:
        return css`
          margin-left: 5px;
          flex: 1 1 auto;
        `
    }
  }}
`

const InputWithLabel = ({ className, title, onChangeValue, direction }) => {
  const handler = useCallback((value) => onChangeValue(value), [onChangeValue])
  const debounceFn = useCallback(debounce(handler, INPUT_DEBOUNCE_TIMES), [
    handler,
  ])
  const onChange = useCallback(
    (event) => debounceFn(event.currentTarget.value),
    [debounceFn]
  )
  return (
    <Container className={className} direction={direction}>
      <Text>{title}</Text>
      <StyledInput direction={direction} onChange={onChange} />
    </Container>
  )
}

InputWithLabel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  direction: PropTypes.oneOf([
    ROW_LABEL_FIRST,
    ROW_INPUT_FIRST,
    COLUMN_LABEL_FIRST,
    COLUMN_INPUT_FIRST,
  ]),
}

InputWithLabel.defaultProps = {
  className: '',
  direction: COLUMN_LABEL_FIRST,
}

export default InputWithLabel
