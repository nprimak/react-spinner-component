# Getting Started with React Spinner Component

There are two components in the project: `App` and `Spinner`

`App` is just to demonstrate usage of `Spinner` and how you can add buttons to control pausing and unpausing the spinner. 

`Spinner` is a functional component which accepts 3 props: `pauseSpinner`, `fileSize`, `transferAmountPerSecond`. File transfer/download is mocked out inside a setInterval function and uses `transferAmountPerSecond` and `fileSize` to update and calculate amount transferred/downloaded. `pauseSpinner` is a boolean used to control pausing of animation (see `App` for example). 

`Spinner` also uses svg elements and css animations. It updates the stroke-dashoffset property every second in order to increase the length of the bar as it rotates around the circle. Inspiration taken from technique used here: [https://www.smashingmagazine.com/2019/01/html5-svg-fill-animation-css3-vanilla-javascript/](https://www.smashingmagazine.com/2019/01/html5-svg-fill-animation-css3-vanilla-javascript/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches Cypress component tests.

Note that Cypress itself is not installed via npm but npx. Make sure it has properly installed before running this command (see [https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress)).

Also note that Cypress component testing is still in Alpha stage (as of 05/26/2021), sometimes you may get strange errors in the terminal while running component tests which you can disregard - tests should still run. (see [https://docs.cypress.io/guides/component-testing/introduction](https://docs.cypress.io/guides/component-testing/introduction))

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\



