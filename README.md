
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
- Leaflet free and open-source map
- Icons: Google Material UI (https://fonts.google.com/icons)
- No scrolling screen. App takes the screen
- Mobile version (Can be scrolled).
- FSD-inspired architecture
- Debounce reverse location name fetching from Geolocation API and legs from Routing API on map points change
- Debounce location name fetching from on typing location name from Geolocation API

## Plan and challenges

- Install GraphiQL + GraphiQL Explorer locally for the HSL endpoints exploration. Easier to query data because HSL (Digitransit) does not have a GraphiQL Explorer plugin installed in their GraphiQL interface.
- Research the data in HSL API to get the idea what to represent in the application.
	- https://portal-api.digitransit.fi/api-details#api=routing-v2-hsl-gtfs
- Design a prototype in Figma
- Backend is not specified in the assignment. I decided to add simple Express.js server because it is not safe to expose API tokens to the client. All the request should me made through the intermediate request from the backend.
- Container dev setup had conflicts on ARM architecture. I could not add node_modules to the volume so it would work in container and host. As a workaround, contianer has it''s own node_modules installed for Linux virtual environment. That's why `make fclean && make dev` after installation of new modules is needed.
- Add filtering by transport type
- Add filtering by speed, stops, walking distance, CO2 emission
- I could've used radix ui or other headless component library but for now I will just use vanilla HTML/SCSS/TS as much as I can.
- Leaflet map responsiveness almost made me end up in ugly hacky ResizeObservers solution. But I have managed it with styles.
- Instant transport filter
- Filter, search and reverse route debounce
- I thought going with react-hook-form for the filter inputs and selections, but as I use custom submission logic and controlled inputs dependent on the global state and custom debounce logic and not much validation, I have decided to just to use custom controlled components

### Idea

- Make possible to create a route
- Analyse the route through the date, when it will be the fastest to get form one point to other point during 24h
- ECharts, Chart.js, Vega

### Improvements that can be done

- Adding authorization for frontend - backend communications to secure the backend from third party request abuse
- Stops could be placed more precisely on the polyline routes (visible when zoomed in). API provides not consistent coordinates. It can be solved mathematically.
- Time could be converted related to the users system time, not API data.
- I did not do a lot optimizations in terms of memoization. This area of the project could be improved in the real-life project.
- Autocomplete Geocoding API can be limited to Uusimaa by providing bounding box coordinates
- Filter callbacks logic can be refactored to redux createSelector and memoizing filtering. For now, kept as it is by sorting edges data in state after the sorting choice is changed from UI.
- Rerenders on filter change in the map can be optimized with memoizing.
- Google SVG icons could be dynamically loaded
- Departure and arrival time could be added as input fields to expand data that can be obtained
- One of the improvement that was on my mind was to fetch a lot of routes according to the address for each hour during the 24 hour window and create Data Distribution graph. It can be done even though one call to Routing API can only be in 8h window. Several sequential calls could solve the task.
- Map could be optimized to move its view to the location found from the search
- CI/CD is a simple implementations with GitHub Actions pulling updates, building the containers and restarting them
