import React from 'react';
import ReactDOM from 'react-dom';
import Index from './containers'



import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'

const store = configureStore();


ReactDOM.render(
    
    <Provider store={store} >
        <Index/>
    </Provider>,
document.getElementById('app'));

