import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useResponsive } from 'hooks'
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

const MovieSuggestion = ({ mood, loading, handleMood, request, errMovieDB, errOpenAI }) => {
  const [image, setImage] = useState('/emojis/neutral.gif')
  const [moodText, setMoodText] = useState('Neutral')
  const { isTablet, isLaptop, isWideScreen, isDesktop } = useResponsive()
  const thereIsError = errMovieDB?.length > 0 || errOpenAI?.length > 0

  const declarePixel = () => {
    if (isWideScreen) {
      return 350
    } else if (isDesktop) {
      return 300
    } else if (isLaptop) {
      return 250
    } else if (isTablet) {
      return 200
    }
    return 180
  }
  useEffect(() => {
    setImage(changeImage(mood))
  }, [mood])

  const changeImage = mood => {
    if (mood < 3) {
      //depressed
      setMoodText('Depressed')
      return '/emojis/depressed.gif'
    } else if (mood < 5) {
      //bored
      setMoodText('Bored')
      return '/emojis/bored.gif'
    } else if (mood == 5) {
      //neutral
      setMoodText('Neutral')
      return '/emojis/neutral.gif'
    } else if (6 <= mood && mood < 8) {
      //happy
      setMoodText('Happy')
      return '/emojis/happy.gif'
    } else if (8 <= mood) {
      //excited
      setMoodText('Excited')
      return '/emojis/excited.gif'
    }
  }
  return (
    <div>
      <Paragraph>How are you feeling today?</Paragraph>
      <Paragraph>Rate your mood between 0-10</Paragraph>
      <Content gap={isDesktop ? '0.6rem' : 'unset'}>
        <ImageContainer src={image} alt="Emoji" width={declarePixel()} height={declarePixel()} />
        <RangeInput
          mood={mood}
          min={0}
          max={10}
          value={mood}
          onChange={e => handleMood(e.target.value)}
          type="range"
        />
        <Mood mood={mood}>{mood}</Mood>
        <MoodText mood={mood}>{moodText}</MoodText>

        {thereIsError ? (
          <ErrorContainer>
            {errOpenAI && <Error>OpenAI Error:{errOpenAI}</Error>}
            {errMovieDB && <Error>MovieDB Error:{errMovieDB}</Error>}
          </ErrorContainer>
        ) : (
          <SuggestButton disabled={loading} onClick={request}>
            Suggest Me!
          </SuggestButton>
        )}
        <a
          href="https://github.com/worm-codes/CineMood"
          target="_newblank"
          rel="noreferrer noopener"
        >
          <img src="./Icon/github.png" alt="github" width={58} />
        </a>
      </Content>
    </div>
  )
}

export default MovieSuggestion
const ErrorContainer = styled.div`
  max-width: 1040px;
`

const Paragraph = styled.p`
  margin: 0;
`
const Error = styled.h2`
  color: red;
`
const Mood = styled.h2`
  color: ${props => colorPicker(props.mood)};
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
  width: 100%;
  max-width: 380px;
  height: 20px;
  border-radius: 5px;
  background: ${props => colorPicker(props.mood)};
  transition: background-color 1s;
`
const ImageContainer = styled(Image)`
  object-fit: contain;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${props => props.gap};
`
