## Overview

This was an exercise in building a robust media interface with just HTML, CSS and JS. 
I wanted to build a tabbed YouTube video component without relying on a javascript framework, so I followed the example of various open source projects to make it happen.
I made some significant improvements to the type safety and various modifications to make it work for my needs.
Please see the credits section for links to the original projects and tutorials I used to build this.

## What this does

This is a simple tabbed interface that allows you to switch between different videos.
The videos are defined in the HTML, and the tabs are generated dynamically based on the number of videos.
The videos are loaded from YouTube using the YouTube iFrame API. And will play automatically when the tab is selected.

## What I learned

### CSS
[PostCSS](https://postcss.org) to  **bundle**, **import from NPM, local or remote URLs**, handy [easings](https://easings.net), plus [postcss-preset-env](https://preset-env.netlify.app/) for **latest CSS features**. 

### JS
[Rollup](https://rollupjs.org) to **bundle**, **treeshake**, **import from NPM, local or remote URLs**, **import processed CSS**, plus [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) for **latest JS features**. 

### Servers
[Browsersync](https://www.browsersync.io) with all the goodies for local dev: **live reload**, **hot swap CSS**, **scroll syncing**, **remote debugging**, [etc](https://www.browsersync.io). Prod server is just a static server.

## Getting Started

#### Clone tabs into a new folder
1. `mkdir new-project-name && cd $_`
1. `git clone --depth=1 https://github.com/tcbrooks/tabs-gui-yt-challenge.git . && rm -rf ./.git`

OR (essentially the same thing with npx+degit)

1. `npx degit argyleink/shortstack`

#### Install tools and spin it up
1. `npm i`
1. `npm start`

<br><br>

## Development
Running `npm start` runs Browsersync, Rollup and Postcss concurrently, watching changes to your files in `./app` and refreshes connected browsers.

## Production
Running `npm run build` compiles and minifies your code in `app` and outputs the optimised result to a folder called `dist` that's ready for static hosting.

Running `npm run production` will build your project and start a server at `dist`.

## Credits
- [Adam Argyle](https://web.dev/building-a-tabs-component/) The original tutorial I followed to build the tabbed interface. A large portion of the HTML and CSS is from this tutorial.
- [Feross Aboukhadijeh](https://github.com/feross/yt-player) The original YouTube player I used to build the video player. I modified it to work with the tabbed interface. 
