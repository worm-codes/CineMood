# CineMood - A Movie Recommendation Application

CineMood is a web application that provides personalized movie recommendations based on the user's mood. The user selects their mood on a scale of 0-10, and CineMood uses OpenAI and omdbAPI to generate a of movie recommendation that match the user's mood.

## Tech Stack

CineMood was built with the following technologies:

- Next.js - a React framework for building server-side rendered (SSR) applications
- OpenAI - an artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc.
- omdbAPI - an API that provides access to movie and TV show data
- styled-components - a CSS-in-JS library that allows you to write actual CSS code to style your components

## Getting Started

To get started with CineMood, follow these steps:

1. Clone the repository onto your local machine.
2. Install the dependencies using `yarn`.
3. Create an account with OpenAI to obtain an API key.
4. Create an account with omdbAPI to obtain an API key.
5. Create a `.env.local` file in the root directory of the project and add the following environment variables:
   OPENAI_API_KEY=<your_OpenAI_API_KEY>
   NEXT_PUBLIC_OMDb_API_KEY=<your_NEXT_PUBLIC_OMDb_API_KEY>
6. Start the development server using `yarn dev`.
7. Open your web browser and navigate to `http://localhost:3000/`.

## Usage

To use CineMood, follow these steps:

1. Move the slider to select your mood on a scale of 0-10.
2. Click the "Suggest Me!" button to generate a movie recommendation that match your mood.
3. After you clicked the button,you can view additional details about the movie, including its rating, genre, Rotten Tomatoes ratinh, IMDB rating, runtime, release year, and plot summary.
4. You can also click the IMDB icon to view the movie on IMDB.

## TODO

1. Mobile responsiveness
2. Add more movie details
3. Add more movie recommendations
4. Add more moods

## Contributing

If you would like to contribute to CineMood, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Submit a pull request.

## Contact

If you have any questions or feedback about CineMood, please contact me at [oguzhan728@gmail.com](mailto:oguzhan728@gmail.com).
