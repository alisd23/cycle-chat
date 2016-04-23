import {run}                from '@cycle/core';
import {makeDOMDriver}      from '@cycle/dom';
import Rx                   from 'rx';
import Main                  from './main'
import {rerunner, restartable} from 'cycle-restart';

// we are pulling in our css files here for webpack to compile
require("./styles/pure-min.css");
require("./styles/layout.css");
require("./styles/grids-responsive-min.css");

// this is the Cycle run. first argument is our mainApp then an object:
// DOM is the ID or class we want the cycle to render onto our page
// History is using our makeHistoryDriver to deal with routing
const drivers = {
  DOM: makeDOMDriver('#root')
};

const rerun = rerunner(run);
rerun(Main, drivers);

if (module && module.hot) {
  module.hot.accept('./main', () => {
    const main = require('./main').default;
    rerun(main, drivers);
  });
  module.hot.accept();
}
