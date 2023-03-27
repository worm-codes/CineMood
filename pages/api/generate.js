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
    console.log(completion.data.choices[0].message.content)
    res.status(200).json({ result: completion.data.choices[0].message.content })
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
  a movie different than ${movie}, based on my current mood? On a scale of 0 to 10, where 0
   is very sad and 10 is very happy, my mood rating is ${mood}.
      Please recommend a movie name that you think would be a good fit for my current mood. 
      I only need the name of the movie, please do not provide any additional details or information.`
    : `Hi ChatGPT, can you recommend a movie based on my current mood?
     On a scale of 0 to 10, where 0 is very sad and 10 is very happy, my mood rating is ${mood}.
      Please recommend a movie name that you think would be a good fit for my current mood. 
      I only need the name of the movie, please do not provide any additional details or information.`
}
