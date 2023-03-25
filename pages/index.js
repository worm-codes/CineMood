import Head from 'next/head'
import styled from 'styled-components'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { MovieDetail, MovieSuggestion } from 'components'

export default function Home() {
  const [mood, setMood] = useState(5)

  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  const request = async () => {
    setLoading(true)

    // const response = await axios.post(
    //   '/api/generate',
    //   { mood, movie: movie.Title },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )
    // const movieName = response?.data.result?.content.split('"')[1]
    // if (movieName.length > 0) {
    //   const response = await axios.post(
    //     `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}&t=${movieName}`
    //   )
    //   console.log(response.data)
    //   setMovie(response.data)
    // }
    setLoading(false)
  }

  const handleMood = mood => {
    setMood(mood)
  }

  return (
    <>
      <Head>
        <title>Suggest Me Movie</title>
        <meta name="description" content="Movie suggestion app according to your mood." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <Container>
          <h1>Suggest Me A Movie</h1>
          {loading ? (
            <Loading />
          ) : movie.Title ? (
            <MovieDetail movie={movie} />
          ) : (
            <MovieSuggestion
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
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`
const Container = styled.div`
  text-align: center;
  position: relative;
  margin: 20px 0;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
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
