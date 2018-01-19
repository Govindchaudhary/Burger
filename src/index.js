import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {  BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { allReducers } from './reducers/index';

const store = createStore(allReducers, applyMiddleware(thunk));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
