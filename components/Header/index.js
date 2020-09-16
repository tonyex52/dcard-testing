import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
`

const Content = styled.div`
  margin-left: 18px;
  flex: 1 1 auto;
  color: white;
  font-size: 28px;
  user-select: none;
`

const Header = ({ className, title }) => (
  <Container className={className}>
    <Content>{title}</Content>
  </Container>
)

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {
  className: '',
}

export default Header
