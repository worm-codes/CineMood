# CineMood - A Movie Recommendation Application

CineMood is a web application that provides personalized movie recommendations based on the user's mood. The user selects their mood on a scale of 0-10, and CineMood uses OpenAI and omdbAPI to generate a list of movie recommendations that match the user's mood.

## Tech Stack

CineMood was built with the following technologies:

- Next.js - a React framework for building server-side rendered (SSR) applications
- OpenAI - an artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc.
- omdbAPI - an API that provides access to movie and TV show data
- styled-components - a CSS-in-JS library that allows you to write actual CSS code to style your components

## Getting Started

To get started with CineMood, follow these steps:

1. Clone the repository onto your local machine.
2. Install the dependencies using `npm install`.
3. Create an account with OpenAI to obtain an API key.
4. Create an account with omdbAPI to obtain an API key.
5. Create a `.env.local` file in the root directory of the project and add the following environment variables:
   OPENAI_API_KEY=<your_OpenAI_API_KEY>
   NEXT_PUBLIC_OMDb_API_KEY=<your_NEXT_PUBLIC_OMDb_API_KEY>
6. Start the development server using `npm run dev`.
7. Open your web browser and navigate to `http://localhost:3000/`.

## Usage

To use CineMood, follow these steps:

1. Navigate to the homepage of the application.
2. Move the slider to select your mood on a scale of 0-10.
3. Click the "Get CineMood" button to generate a list of movie recommendations that match your mood.
4. Click on any movie in the list to view additional details about the movie, including its rating, release year, and plot summary.

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
