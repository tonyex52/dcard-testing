import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from 'components/Header'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 60px auto;
`

const StyledHeader = styled(Header)`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  box-shadow: ${({ theme }) => theme.boxShadow};
`

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
`

const PageView = ({ className, title, Children }) => (
  <Container className={className}>
    <StyledHeader title={title} />
    {Children && <Content>{Children}</Content>}
  </Container>
)

PageView.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  Children: PropTypes.node,
}

PageView.defaultProps = {
  className: '',
  Children: null,
}

export default PageView
