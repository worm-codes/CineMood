import Head from 'next/head'
import styled from 'styled-components'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { MovieDetail, MovieSuggestion } from 'components'

export default function Home() {
  const [mood, setMood] = useState(5)

  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({
    Title: 'La La Land',
    Year: '2016',
    Rated: 'PG-13',
    Released: '25 Dec 2016',
    Runtime: '128 min',
    Genre: 'Comedy, Drama, Music',
    Director: 'Damien Chazelle',
    Writer: 'Damien Chazelle',
    Actors: 'Ryan Gosling, Emma Stone, Rosemarie DeWitt',
    Plot: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    Language: 'English, Cantonese',
    Country: 'United States, Hong Kong',
    Awards: 'Won 6 Oscars. 243 wins & 297 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.0/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '91%',
      },
      {
        Source: 'Metacritic',
        Value: '94/100',
      },
    ],
    Metascore: '94',
    imdbRating: '8.0',
    imdbVotes: '603,367',
    imdbID: 'tt3783958',
    Type: 'movie',
    DVD: '25 Apr 2017',
    BoxOffice: '$151,101,803',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  })
  const [errOpenAI, setErrOpenAI] = useState('')
  const [errMovieDB, setErrMovieDB] = useState('')

  const request = async () => {
    setLoading(true)

    try {
      const response = await axios.post(
        '/api/generate',
        { mood, movie: movie.Title },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      requestMovieDB(response?.data.result?.content.split('"')[1])
    } catch (err) {
      setErrOpenAI(err?.response?.data?.error?.message)
      setLoading(false)
    }

    setLoading(false)
  }

  const requestMovieDB = async movieName => {
    try {
      if (movieName.length > 0) {
        const response = await axios.post(
          `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}&t=${movieName}`
        )

        setMovie(response.data)
      }
    } catch (err) {
      setErrMovieDB(err?.response?.data?.Error)
    }
  }

  const handleMood = mood => {
    setMood(mood)
  }
  const resetMovie = () => {
    setMovie({})
  }

  return (
    <>
      <Head>
        <title>CineMood</title>
        <meta name="description" content="Movie suggestion app based on your mood." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <Container>
          <div>
            <Brand>CineMood</Brand>
          </div>
          {loading ? (
            <>
              <Loading />
              <h2>Go get some snacks</h2>
              <h2> While I am searching...</h2>
            </>
          ) : movie.Title ? (
            <MovieDetail resetMovie={resetMovie} movie={movie} />
          ) : (
            <MovieSuggestion
              errOpenAI={errOpenAI}
              errMovieDB={errMovieDB}
              mood={mood}
              loading={loading}
              request={request}
              handleMood={handleMood}
            />
          )}
        </Container>
      </MainContainer>
    </>
  )
}
const Brand = styled.h1`
  margin-bottom: 1rem;
  color: rgb(255, 0, 0); /* starting color is red */
  animation: colorChange 8s infinite;
  @keyframes colorChange {
    0% {
      color: rgb(255, 0, 0); /* red */
    }
    25% {
      color: rgb(0, 255, 0); /* green */
    }
    50% {
      color: rgb(0, 0, 255); /* blue */
    }
    75% {
      color: rgb(255, 255, 0); /* yellow */
    }
    100% {
      color: rgb(255, 0, 255); /* magenta */
    }
  }
`
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  p {
    font-size: 1.5rem;
    font-weight: 400;
  }
`

const Loading = styled.div`
  border: 15px solid #f3f3f3;
  border-top: 15px solid #000000;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  margin: 5rem auto;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
