import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mood, setMood] = useState(5)
  const [image, setImage] = useState('/neutral.gif')

  useEffect(() => {
    setImage(changeImage(mood))
  }, [mood])

  const changeImage = mood => {
    if (mood < 3) {
      //depressed
      return '/depressed.gif'
    } else if (mood < 5) {
      //bored
      return '/bored.gif'
    } else if (mood == 5) {
      console.log('5')
      //neutral
      return '/neutral.gif'
    } else if (6 <= mood && mood < 8) {
      //happy
      return '/happy.gif'
    } else if (8 <= mood) {
      //excited
      return '/excited.gif'
    }
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
          <p>Movie suggestion app according to your mood.</p>
          <Content>
            <ImageContainer src={image} alt="Emoji" width={250} height={300} />
            <RangeInput min={0} max={10} onChange={e => setMood(e.target.value)} type="range" />
            {mood}
          </Content>
        </Container>
      </MainContainer>
    </>
  )
}
const RangeInput = styled.input`
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
  }
  &::hover {
    opacity: 1;
  }
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: 40%;
  height: 20px;
  border-radius: 5px;
  background: #d3d3d3;
`
const ImageContainer = styled(Image)`
  object-fit: contain;
  margin-right: 1rem;
`

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Container = styled.div`
  text-align: center;
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
