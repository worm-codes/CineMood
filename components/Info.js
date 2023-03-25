import styled from 'styled-components'
const Info = ({ title, content }) => {
  return (
    <div>
      <OverlinedHeader>{title}</OverlinedHeader>
      <h2>{content}</h2>
    </div>
  )
}

export default Info
const OverlinedHeader = styled.h2`
  text-decoration: underline;
`
