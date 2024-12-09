# 🎥Cue - Movie and TV Show Recommendation App

[Cue](https://cue.cidominguez.com) is a Remix.js application that helps users discover their next favorite movies and TV shows. With fast fuzzy search capabilities and personalized recommendations, Cue ensures you never run out of great content to watch.

## ✨ Features

- **Fuzzy Search**: Powered by [Fuse.js](https://fusejs.io), Cue provides approximate string matching to help you find the right title, even with typos or partial matches.
- **Personalized Recommendations**: Using the [TMDB API](https://www.themoviedb.org/documentation/api), Cue offers tailored recommendations based on genres, cast, crew, and user ratings.
- **Favorites & Recently Viewed**: Save your favorite titles and revisit your recent searches quickly with local storage. No accounts or server-side storage required!

## Made with some really cool tools 👇

- ⚡ [Vite](https://vite.dev/)
- 🟦 [Typescript](https://www.typescriptlang.org/)
- 🟢 [Node.js](https://nodejs.org/en)
- 🎛️ [Remix.js](https://remix.run/)
- 🌐 [Axios](https://axios-http.com/)
- 🟣 [Fuse.js](www.fusejs.io)
- 💎 [Zod](https://zod.dev/)
- 🎥 [TMDB API](https://www.themoviedb.org/documentation/api)

## Local Setup ⚙

1. Clone the repo

2. Create a `.env` file in the root directory of the project and add the following variables:

```
VITE_TMDB_API_KEY=
```

3. Run `npm install` to install the dependencies

4. Run `npm run dev` to start the local development server
