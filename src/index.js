import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm95LXRlc3NsZXIiLCJhIjoiY2s1dHQ3Y2c1MTJqZjNtbWo5Nnd0YWF3NSJ9.GZhaMsa2mwV8erxqIkvd2Q';
