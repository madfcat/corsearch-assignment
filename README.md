
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

- SASS modules
- Docker
- CI/CD using GitHub Actions for automated testing and deployment
- Icons: Google Material UI
- No scrolling screen. App takes the screen
- Mobile version (Can be scrolled).

## Plan and challenges

- Install GraphiQL + GraphiQL Explorer locally for the HSL endpoints exploration. Easier to query data because HSL (Digitransit) does not have a GraphiQL Explorer plugin installed in their GraphiQL interface.
- Research the data in HSL API to get the idea what to represent in the application.
	- https://portal-api.digitransit.fi/api-details#api=routing-v2-hsl-gtfs
- Design a prototype in Figma
- Backend is not specified in the assignment. I decided to add simple Express.js server because it is not safe to expose API tokens to the client. All the request should me made through the intermediate request from the backend.
- Add filtering by transport type
- Add filtering by speed, stops, walking distance, CO2 emission
- I could've used radix ui or other headless component library but for now I will just use vanilla HTML/SCSS/TS as much as I can.
- Leaflet map responsiveness almost made me end up in ugly hacky ResizeObservers solution. But I have managed it with styles.

### Idea

- Make possible to create a route
- Analyse the route through the date, when it will be the fastest to get form one point to other point during 24h
- 
