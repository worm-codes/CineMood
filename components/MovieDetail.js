import styled from 'styled-components'
import { Info } from 'components'

const MovieDetail = ({ movie, resetMovie }) => {
  return (
    <Container>
      <img src={movie.Poster} alt="movie Poster" />
      <Informations>
        <GeneralInfo>
          {' '}
          <Info title="Title" content={movie.Title} />
          <Info title="Year" content={movie.Year} />
          <Info title="Genre" content={movie.Genre} />
        </GeneralInfo>
        <GeneralInfo>
          {movie?.Ratings[1]?.Source === 'Rotten Tomatoes' && (
            <div>
              <img src="./Icon/rotten.svg" alt="Rotten Tomatoes" />
              <h2>{movie?.Ratings[1]?.Value}</h2>
            </div>
          )}
          <div>
            <a
              target="_newblank"
              rel="noreferrer noopener"
              href={`https://www.imdb.com/title/${movie?.imdbID}/`}
            >
              <img src="./Icon/imdb.svg" />
            </a>
            <h2>{movie?.imdbRating}</h2>
          </div>
          <Info title="Runtime" content={movie.Runtime} />
        </GeneralInfo>
        <h2>
          <p>
            <b>Plot : </b>
            {movie.Plot}
          </p>
        </h2>
        <SuggestNewButton onClick={resetMovie}>Suggest New One</SuggestNewButton>
      </Informations>
    </Container>
  )
}

export default MovieDetail

const Informations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 66%;
`

const GeneralInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
`

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`
const SuggestNewButton = styled.button`
  width: 300px;
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 1s;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`
