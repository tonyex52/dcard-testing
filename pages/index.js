import { useCallback } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PageView from 'components/PageView'
import InputWithLabel from 'components/InputWithLabel'
import RepositoryList from 'components/RepositoryList'
import {
  loadRepositories,
  loadNextPageRepositories,
} from 'containers/App/actions'

const Content = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const StyledInputWithLabel = styled(InputWithLabel)`
  flex: 0 0 auto;
`

const StyledRepositoryList = styled(RepositoryList)`
  margin-top: 10px;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
`

const Index = ({
  repositoryInfo,
  getRepositories,
  getNextPageRepositories,
}) => {
  const onChangeValue = useCallback((value) => {
    getRepositories(value)
  }, [])
  return (
    <PageView title="搜尋 Repositories">
      <Content>
        <StyledInputWithLabel title="Keyword" onChangeValue={onChangeValue} />
        <StyledRepositoryList
          repositoryInfo={repositoryInfo}
          onScroll={() => {
            getNextPageRepositories()
          }}
        />
      </Content>
    </PageView>
  )
}

export default connect(
  (state) => ({
    repositoryInfo: state.app,
  }),
  {
    getRepositories: loadRepositories,
    getNextPageRepositories: loadNextPageRepositories,
  }
)(Index)
