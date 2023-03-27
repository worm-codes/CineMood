import styled from 'styled-components'
const Info = ({ title, content }) => {
  return (
    <InfoContainer>
      <OverlinedHeader isItGenre={title === 'Genre'}>{title}</OverlinedHeader>
      <h2>{content}</h2>
    </InfoContainer>
  )
}

export default Info
const OverlinedHeader = styled.h2`
  text-decoration: underline;
`
const InfoContainer = styled.div`
  max-width: 270px;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
  }
`
