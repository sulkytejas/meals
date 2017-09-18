import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'

 const middlewareCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer,
middlewareCompose(applyMiddleware(logger))
)

ReactDOM.render(<Provider store={store}>
     <App />
   </Provider>, document.getElementById('root'));
registerServiceWorker();
