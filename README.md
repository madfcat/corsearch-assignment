## Technical Assessment – Public Transport Data Explorer

### Objective

Build a web application that loads, analyses, and visualises public transport data using the HSL API. The application should present meaningful insights in an intuitive way.

### Tech Stack

- TypeScript
- React
- Sass with CSS Modules

### Requirements

- Fetch and display transport data from the HSL API.
- Implement an interactive UI to explore and analyse the data.
- Ensure a smooth user experience, including search, filtering, or other relevant features.
- Deploy the application and set up a CI/CD pipeline for automated testing and deployment.

### Submission

- Provide a live deployment link and a GitHub repository.
- Include a README.md explaining your approach, challenges faced, and potential improvements.

## My approach

At first, my idea was to create a bicycle related application showing rentals, parkings etc. But there is not so much data to play with. At least at this season.

So, I decided to implement interactive map with list of available routes, filter, sort and ability to search by address and by the location from the map.

Each request is limited to 5 hours window or 50 routes (HSL API limitation).
Users can use interactive map with right click or inputs to set location and final destination.

- Figma design: https://www.figma.com/design/G8Vp9CvlK26IVeOKfCWLLJ/Corsearch-Test-Assignment?node-id=0-1&t=FnVNiLQseH0XN1hN-1
- Live version: http://37.27.252.44/ (will be dropped soon) 

### Features

- SASS modules
- Docker
  - Frontend served from nginx container and reverse proxy
  - Backend using node and Express.js to protect API tokens
- CI/CD using GitHub Actions for automated testing and deployment
- Leaflet free and open-source map
- Icons: Google Material UI (https://fonts.google.com/icons)
- Non-scrollable screen. App takes the screen
- FSD-inspired architecture
- Debounce reverse location name fetching from Geolocation API and legs from Routing API on map points change
- Debounce location name fetching from on typing location name from Geolocation API
- Debounce on transport filter change
- Sorting implemented on the client side

## Development

- To run locally: install Docker and `make` to run the project efficiently.
- Make sure to keep the project in `corsearch-assignment` directory for `make fclean` to work properly.

## Environment variables

The project uses Routing API and Geocoding API (https://www.hsl.fi/en/hsl/open-data)

`GRAPHQL_API_TOKEN` - obtained from https://digitransit.fi/en/developers/api-registration/

`VITE_HOST` - your server ip address or domain

`.env` file should have these variables:

```
GRAPHQL_API_TOKEN=
GRAPHQL_ENDPOINT=https://api.digitransit.fi/routing/v2/hsl/gtfs/v1
GEOCODING_ENDPOINT=http://api.digitransit.fi/geocoding/v1/

# Put your production url here (e.g. http://35.26.27.38). Keep empty to use with localhost
VITE_HOST=
```

### Run the project locally

Project is developed and build for production in Docker containers.

#### Development

```
make dev
```

The issue arised with dev on MacOS with ARM processors. That's why volume of `node_modules` is not mapped to the container. If additional pacakges are installed, `make fclean && make dev` should be performed

Then follow: http://localhost:5173/

#### Build

```
make prod
```

Then follow: http://localhost/

### GraphiQL

To study Routing API and easier query building, GraphiQL with GraphiQl Explorer was used locally.

To run:

```
npm install
make graphiql
```

or

```
npm install
npm --prefix graphiql run dev
```

Then follow: http://localhost:5174/

## Plan and challenges

- Install GraphiQL + GraphiQL Explorer locally for the HSL endpoints exploration. Easier to query data because HSL (Digitransit) does not have a GraphiQL Explorer plugin installed in their GraphiQL interface.
- Research the data in HSL API to get the idea what to represent in the application.
  - https://portal-api.digitransit.fi/api-details#api=routing-v2-hsl-gtfs
- Design a prototype in Figma
- Backend is not specified in the assignment. I decided to add simple Express.js server because it is not safe to expose API tokens to the client. All the request should me made through the intermediate request from the backend.
- Container dev setup had conflicts on ARM architecture. I could not add node_modules to the volume so it would work in container and host. As a workaround, contianer has it''s own node_modules installed for Linux virtual environment. That's why `make fclean && make dev` after installation of new modules is needed.
- Add filtering by transport type
- Add filtering by speed, stops, walking distance, CO2 emission etc
- I could've used radix ui or other headless component library but for now I will just use vanilla HTML/SCSS/TS as much as I can.
- Leaflet map responsiveness almost made me end up in ugly hacky ResizeObservers solution. But I have managed it with styles.
- Instant transport filter
- Filter, search and reverse route debounce
- I thought going with react-hook-form for the filter inputs and selections, but as I use custom submission logic and controlled inputs dependent on the global state and custom debounce logic and not much validation, I have decided to just to use custom controlled components
- Make possible to create a route and have data visualized

### Improvements that can be done

- Adding authorization for frontend - backend communications to secure the backend from third party request abuse
- Stops could be placed more precisely on the polyline routes (visible when zoomed in). API provides not consistent coordinates. It can be solved mathematically.
- Time could be converted related to the users system time, not API data.
- I did not do a lot optimizations in terms of memoization
- Autocomplete Geocoding API can be limited to Uusimaa by providing bounding box coordinates
- Filter callbacks logic can be refactored to redux createSelector and memoizing filtering. For now, kept as it is by sorting edges data in state after the sorting choice is changed from UI.
- Rerenders on filter change in the map can be optimized with memoizing.
- Google SVG icons could be dynamically loaded
- Departure and arrival time could be added as input fields to expand data that can be obtained
- One of the improvement that was on my mind was to fetch a lot of routes according to the address for each hour during the 24 hour window and create Data Distribution graph. It can be done even though one call to Routing API can only be in 8h window. Several sequential calls could solve the task.
- Analyse the route through the date, when it will be the fastest to get form one point to other point during 24h.
- Add ECharts, Chart.js or Vega for graph visualization
- Map could be optimized to move its view to the location found from the search
- CI/CD is a simple implementations with GitHub Actions pulling updates, building the containers and restarting them. It could be improved with creating blue/green deployment
- Definitely more tests
- Also GitHub actions script could be expanded for initial deployment
- Mobile version (Should be scrolled).
- Use of user's current geolocation could be added to input fields and map.

