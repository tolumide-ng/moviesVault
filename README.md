# Movies Vault

## Table of Content

- [About this Application](#about-this-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [General](#general)
- [How does the application work](#how-does-the-application-work)
- [Running this application locally and testing](#running-this-application-locally-and-testing)
  - [Using Docker Compose](#using-docker-compose)
    - [Prerequisites](#prerequisites)
    - [Start the Application locally](#using-docker-compose-start-the-application-locally)
    - [Shutting down the Application](#using-docker-compose-shutting-down-the-application)
  - [Using npm](#using-npm)
    - [Prerequisites](#prerequisites-1)
    - [Run the Application's Unit tests](#using-npm-run-the-applications-unit-tests)
    - [Start the Application locally](#using-npm-start-the-application-locally)
    - [Shutdown the Application](#using-npm-shutdown-the-application)
  - [Some Decisions made](#some-decision-made)
  - [TroubleShooting](#troubleshooting)
  - [Recording](#recording)

## About this Application

The application focuses on the following key principles:

- **Accessibility(Respsonsiveness)**: The application is designed to be user-friendly across devices, making navigation and interaction seamless on both mobile and desktop platforms
- **Modularity**: Embraces the Atomic Design Pattern
- **Testability**: Enables robust and efficient testing to ensure reliability and quality
- **Performance**: Optimizes performance by loading resources only when needed, reducing initial load times
- **Clean Code**: Writing maintainable, readable, and efficient code for better collaboration and future updates.
- **Scalability**
- **Error Handling**

### Frontend

- This project enables users to view view available movies
- Users can use the application whether they're authenticated or not
- Authenticated and UnAuthenticated users can use the Application `Search Bar` to search for the desired movie by:
  - Genre(s)
  - Title (Movie's title) - which is debounced
  - Movie rating
  - Us Certificate
    > [!NOTE] All requests are made to the server, but since this is mocked, the results would not meet your search requests
- The All movies page (Home page) can also be navigated using the Pagination tool on the bottom of the page
- To authenticate, users can enter any username and any password to login (the backend is only a mock API)
  - User are tied to the browsers they use, as movies are simply saved on localStorage
  - To Login, simply click on the `Login` menu on the top-left-hand corner of the menu bar
- Authenticated users can add movies to their list of Favorite movies
  - Only Authenticated users can add movies to their favorite movies list
- Authenticated users can view the movies on their favorites list by clicking on the `Favorites` menu on the topbar of the application
- Authenticated users can remove movies from their list of Favorite movies by simply clicking the `Remove Favorite` on the Movie card
- Users can navigate through the `All Movies` Page using their keyboard only
- All users can view more details about a movie by simply clicking on such movie
  - Clicking on the a `Movie Card` takes the user the specific movie's page
- The Specific Movie Page displays more information about a movie including:

  1. All images on the specific Movie
  2. Genre of the movie e.g. sci-fi, comedy, adventure
  3. Description of the movie
  4. Details like the release date, and appplicable US Certificates
  5. Crew members of such movie

- Authenticated users can log out of the application
  - Logging out means they would no longer have access to the list of their favorite movies

### Backend

- The Application's backend uses a simulated mockAPI
- The API documentation can be found inside [openapi.yaml](./public/openapi.yaml)
  - This was used to generate the API response data types [found in](./src/types/generated/schema.d.ts)
- The backend uses [`json-server`](https://www.npmjs.com/package/json-server) to provide a fake REST API for the `movies` endpoint
  - Hence, all displayed movies are not real
  - Queries made to the backend to filter particular movies do not work as expected, but you can find the requests on the `network tab` if you'd like to see
  - The data used by `json-server` can be found in [db.json](./src/utils/mockServer/db.json) which I generated using [setupDb.ts file](./src/utils/mockServer/setupDb.ts)
- A fake request that simply involves a promise that simply resolves after a set setTimeout, stores the user's favorite movie when requested in the localStorage

### General

- This application is accessible on all types of devices (mobile and desktop)
- This project uses the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for it's component structure
- It is built with

  - [React v18.3.1](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Docker](https://docs.docker.com/compose/install/)
  - [Axios](https://www.npmjs.com/package/axios) for Handling Network requests
  - Styled with [ChakraUI](https://v2.chakra-ui.com/) which depends on emotion, framer-motion
  - Scaffolded with [CreateVite](https://www.npmjs.com/package/create-vite)
  - React ContextAPI [ContextAPI](https://react.dev/reference/react/createContext) for State management
  - Bundled with [Vite](https://www.npmjs.com/package/vite)
  - Routing is managed with [React Router](https://reactrouter.com/)
  - [React Select](https://github.com/JedWatson/react-select/tree/master)

- The application is tested (Unit tests) using:
  - [Jest](https://jestjs.io/) and,
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How Does the application work

As mentioned earlier, this application enables all users to browse and view movies, utilizing the pagination tool, and explore further with the search bar. However, only authenticated users can add movies to their favorites, view their favorite list, or remove movies from it.

> [NOTE!] You can Authenticate yourself using any name or password on the Login page

<br />
<br />

> [!NOTE] Please ensure that port `5173` and port `3000` are free and available for use on your machine as these are the ports used in this application
>
> - Port 5173: Frontend
> - Port 3000: Backend

## Running this application locally and testing

1. Open your workspace terminal
2. Clone this repository
3. Cd into the cloned repository
4. There are two ways you can start or test this application locally:

### Using Docker Compose:

#### Prerequisites:

1.  [Docker](https://docs.docker.com/get-docker/)
2.  [Docker Compose](https://docs.docker.com/compose/install/)

#### Using Docker Compose: Start the Application locally

1. To start the application with docker-compose, simply run (on MacOS):

```
docker-compose up
```

1. To start the application with docker-compose, simply run (on Ubuntu):

```
sudo docker compose up
```

Visit [`localhost:5173`](localhost:5173) on your favourite browser to view the application

#### Using Docker Compose: Shutting down the Application

1. Press `Cmd + C` on a MacOS or `Ctrl+ C` on Ubuntu to stop the application
2. Run (on MacOS):

```
docker-compose down
```

2. Run (on Ubuntu):

```
sudo docker compose down
```

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v21.7.3
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Using npm: Run the Application's Unit tests

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

#### Using npm: Start the Application locally

1. Install the dependencies with:

```
npm install
```

2. Start the application with:

```
npm start
```

Visit [`localhost:5173`](localhost:5173) on your favourite browser to view the application

#### Using npm: Shutdown the Application

1. Press `Cmd + C` on MacOs or `Ctrl + C` on Ubuntu to stop the application

## Some Decision Made

- The backend (API_URL) was intentionally exposed on this application to make the access easier in one command without having to set up any config which might introduce an inconvience for users
  - In a Production application, this would be stored and accessed using secret management tools like a `.env` file

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on [`port 3000`](localhost:3000) and [`port 5173`](localhost:5173) before running this application
2. Ensure that you're logged into the application to access the `Favorite Movies` Feature
3. Seeing an Error like this error when trying to install depdencies on Ubuntu?

```
Error: EACCES: Permission denied, mkdir '/<file_path>
```

Solution:

- Run `rm -rf node_modules` in the repository and then `npm install` again
  Why did that happen?: Well, it's possible that you had ran `docker-compose` earlier

## Recording

1. [Desktop Screens](./public/DesktopScreens.mov)
2. [Mobile Screens](./public/mobileScreens.mov)
