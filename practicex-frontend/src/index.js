import React from 'react';
import { render } from 'react-dom';
import configureStore from './utils/configureStore';
import Root from './components/Root';
import './assets/semantic/dist/semantic.min.css';
import './assets/scss/App.scss';

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));
