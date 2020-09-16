import { useRef, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  height: 0;
`

const Waypoint = ({
  scrollableAncestor,
  onEnter,
  onLeave,
  topOffset,
  bottomOffset,
}) => {
  const waypointRef = useRef(null)
  const [isEnter, setIsEnter] = useState(false)
  const onScroll = useCallback(
    (event) => {
      const { clientHeight: containerHeight, scrollTop } = event.currentTarget
      const viewTop = scrollTop - topOffset
      const viewBottom = containerHeight + scrollTop - bottomOffset
      const waypointPosition =
        waypointRef.current.offsetTop -
        event.currentTarget.getBoundingClientRect().y
      if (
        !isEnter &&
        viewTop <= waypointPosition &&
        viewBottom >= waypointPosition
      ) {
        onEnter()
        setIsEnter(true)
      } else if (
        isEnter &&
        (viewTop > waypointPosition || viewBottom < waypointPosition)
      ) {
        onLeave()
        setIsEnter(false)
      }
    },
    [isEnter, setIsEnter, onEnter]
  )

  useEffect(() => {
    if (scrollableAncestor) {
      scrollableAncestor.current.addEventListener('scroll', onScroll)
      return () => {
        scrollableAncestor.current.removeEventListener('scroll', onScroll)
      }
    }

    const { parentElement } = waypointRef.current
    parentElement.addEventListener('scroll', onScroll)
    return () => {
      parentElement.removeEventListener('scroll', onScroll)
    }
  }, [])
  return <Container ref={waypointRef} />
}

Waypoint.propTypes = {
  scrollableAncestor: PropTypes.object,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
}

Waypoint.defaultProps = {
  onEnter: () => {},
  onLeave: () => {},
  topOffset: 0,
  bottomOffset: 0,
}

export default Waypoint
