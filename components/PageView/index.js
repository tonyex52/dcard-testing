import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from 'components/Header'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 60px auto;
  overflow: hidden;
`

const StyledHeader = styled(Header)`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  box-shadow: ${({ theme }) => theme.boxShadow};
`

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  overflow: hidden;
`

const PageView = ({ className, title, children }) => (
  <Container className={className}>
    <StyledHeader title={title} />
    {children && <Content>{children}</Content>}
  </Container>
)

PageView.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

PageView.defaultProps = {
  className: '',
  children: null,
}

export default PageView
