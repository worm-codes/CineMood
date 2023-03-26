import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const mood = req?.body?.mood
  const movie = req?.body?.movie

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: generatePrompt(mood, movie) }],
    })

    res.status(200).json({ result: completion.data.choices[0].message })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          result: 'An error occurred during your request.',
        },
      })
    }
  }
}

function generatePrompt(mood, movie = '') {
  return movie.length !== 0
    ? `Hi ChatGPT, can you recommend 
  a movie difference than ${movie} based on my current mood? On a scale of 0 to 10,
   0 is very sad, and 10 is very happy my mood rating is ${mood}. Just Return the movie name.`
    : `Hi ChatGPT, can you recommend 
  a movie based on my current mood? On a scale of 0 to 10,
   0 is very sad, and 10 is very happy my mood rating is ${mood}. Just Return the movie name.`
}
