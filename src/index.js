import React from 'react';
import { hydrate, render } from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import rootReducer from './store/rootReducer'

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
if(rootElement.hasChildNodes()) {
    hydrate(
        <Provider store={store}>
            <App/>
        </Provider>, rootElement
    );
} else {
    render(
        <Provider store={store}>
            <App/>
        </Provider>, rootElement
    );
}

serviceWorker.unregister();
