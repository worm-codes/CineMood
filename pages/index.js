import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mood, setMood] = useState(5)
  const [image, setImage] = useState('/neutral.gif')
  const [moodText, setMoodText] = useState('Neutral')

  useEffect(() => {
    setImage(changeImage(mood))
  }, [mood])

  const changeImage = mood => {
    if (mood < 3) {
      //depressed
      setMoodText('Depressed')
      return '/depressed.gif'
    } else if (mood < 5) {
      //bored
      setMoodText('Bored')
      return '/bored.gif'
    } else if (mood == 5) {
      //neutral
      setMoodText('Neutral')
      return '/neutral.gif'
    } else if (6 <= mood && mood < 8) {
      //happy
      setMoodText('Happy')
      return '/happy.gif'
    } else if (8 <= mood) {
      //excited
      setMoodText('Excited')
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
          <>
            <Paragraph>How are you feeling today?</Paragraph>
            <Paragraph>Rate your mood between 0-10</Paragraph>
            <Content>
              <ImageContainer src={image} alt="Emoji" width={250} height={300} />
              <RangeInput
                mood={mood}
                min={0}
                max={10}
                onChange={e => setMood(e.target.value)}
                type="range"
              />

              <MoodText mood={mood}>
                {moodText}
                <Mood>{mood}</Mood>
              </MoodText>

              <SuggestButton>Suggest Me!</SuggestButton>
            </Content>
          </>
        </Container>
      </MainContainer>
    </>
  )
}

const colorPicker = mood => {
  return mood < 3
    ? '#00d0fd'
    : mood < 5
    ? '#ff8c00'
    : mood == 5
    ? '#000000'
    : mood < 8
    ? '#ff11ef'
    : '#ff0a0a'
}
const Paragraph = styled.p`
  margin: 0;
`
const Mood = styled.h3`
  margin: 0;
`

const SuggestButton = styled.button`
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
const MoodText = styled.h3`
  width: 200px;
  padding: 1rem 1rem;
  color: ${props => colorPicker(props.mood)};
  transition: color 1s;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
`
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
  background: ${props => colorPicker(props.mood)};
  transition: background-color 1s;
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
