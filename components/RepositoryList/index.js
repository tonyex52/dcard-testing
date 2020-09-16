import PropTypes from 'prop-types'
import styled from 'styled-components'
import { WindowNew } from '@styled-icons/zondicons'
import Spinner from 'components/Spinner'
import Waypoint from 'components/Waypoint'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Item = styled.div`
  flex: 0 0 auto;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const FullNameContainer = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  line-height: 25px;
`
const FullName = styled.span`
  word-break: break-word;
  font-size: 20px;
  font-weight: bold;
`
const Anchor = styled.a`
  margin-left: 5px;
  font-size: 0;
  vertical-align: middle;
`
const User = styled.div`
  margin-left: 8px;
  flex: 0 0 auto;
`
const StyledWindowNew = styled(WindowNew)`
  color: ${({ theme }) => theme.newWindowColor};
`

const StyledSpinner = styled(Spinner)`
  flex: 0 0 auto;
  color: ${({ theme }) => theme.spinnerColor};
`

const EmptyText = styled.div`
  flex: 0 0 auto;
`

const RepositoryList = ({
  className,
  repositoryInfo: { repositories: list, isLoaded, total },
  onScroll,
}) => (
  <Container className={className}>
    {list.map((item) => (
      <Item key={item.id}>
        <FullNameContainer>
          <FullName>{item.full_name}</FullName>
          {!item.private && (
            <Anchor href={item.html_url} target="_blank" rel="noreferrer">
              <StyledWindowNew size="18px" />
            </Anchor>
          )}
        </FullNameContainer>
        <User>{item.owner.login}</User>
      </Item>
    ))}
    {!isLoaded && list.length !== 0 && <StyledSpinner size="50" />}
    {isLoaded && list.length < total && onScroll && (
      <Waypoint onEnter={onScroll} bottomOffset={-50} />
    )}
    {isLoaded && list.length === 0 && <EmptyText>沒有資料</EmptyText>}
  </Container>
)

RepositoryList.propTypes = {
  className: PropTypes.string,
  repositoryInfo: PropTypes.shape({
    isLoaded: PropTypes.bool,
    repositories: PropTypes.arrayOf(
      PropTypes.shape({
        full_name: PropTypes.string,
        owner: PropTypes.shape({
          login: PropTypes.string,
        }),
        private: PropTypes.bool,
        html_url: PropTypes.string,
      })
    ),
    total: PropTypes.number,
  }),
  onScroll: PropTypes.func,
}

RepositoryList.defaultProps = {
  className: '',
  repositoryInfo: {
    isLoaded: false,
    repositories: [],
    total: 0,
  },
}

export default RepositoryList
