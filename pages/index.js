import Head from 'next/head'
import styled from 'styled-components'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { MovieDetail, MovieSuggestion } from 'components'
import { useResponsive } from 'hooks'

export default function Home() {
  const [mood, setMood] = useState(5)

  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})
  const [lastMovie, setLastMovie] = useState({})
  const [errOpenAI, setErrOpenAI] = useState('')
  const [errMovieDB, setErrMovieDB] = useState('')
  const [isRequestPending, setIsRequestPending] = useState(false)
  const { isTablet } = useResponsive()
  const [requestCountDown, setRequestCountDown] = useState(10)

  const request = async () => {
    setLoading(true)

    try {
      const response = await axios.post(
        '/api/generate',
        { mood, movie: lastMovie.Title },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response?.data.result?.includes('"')) {
        const movieNameToSearch = response?.data?.result
          ?.split('"')[1]
          .replaceAll(' ', '+')
          .replaceAll('.', '')

        await requestMovieDB(movieNameToSearch)
      } else {
        const movieNameToSearch = response?.data.result?.replaceAll(' ', '+').replaceAll('.', '')

        await requestMovieDB(movieNameToSearch)
      }
    } catch (err) {
      setErrOpenAI(err?.response?.data?.error?.message)
      setLoading(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (setIsRequestPending) {
      const countdownInterval = setInterval(() => {
        setRequestCountDown(countdown => countdown - 1)
      }, 1000)

      if (requestCountDown === 0) {
        clearInterval(countdownInterval)
        setRequestCountDown(10)
        setIsRequestPending(false)
      }

      return () => clearInterval(countdownInterval)
    }
  }, [requestCountDown, setIsRequestPending])

  const requestMovieDB = async movieName => {
    try {
      if (movieName.length > 0) {
        if (movieName.includes('.')) {
          movieName.pop()
        }
        const response = await axios.post(
          `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}&t=${movieName}`
        )
        setIsRequestPending(true)
        setMovie(response.data)
        startCountdown()
      }
    } catch (err) {
      setErrMovieDB(err?.response?.data?.Error)
    }
  }

  const handleMood = mood => {
    setMood(mood)
  }
  const resetMovie = movie => {
    setLastMovie(movie)
    setMovie({})
  }

  return (
    <>
      <Head>
        <title>CineMood</title>
        <meta name="description" content="Movie suggestion app based on your mood." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainContainer>
        <Container>
          <div>
            <Brand>CineMood</Brand>
          </div>
          {loading ? (
            <>
              <Loading isTablet={isTablet} />
              <h2>Go get some snacks</h2>
              <h2> While I am searching...</h2>
            </>
          ) : movie.Title ? (
            <MovieDetail resetMovie={resetMovie} movie={movie} />
          ) : (
            <MovieSuggestion
              requestCountDown={requestCountDown}
              isRequestPending={isRequestPending}
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
  width: ${props => (!props.isTablet ? '150px' : '250px')};
  height: ${props => (!props.isTablet ? '150px' : '250px')};
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
