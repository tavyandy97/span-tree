import React from 'react';
import {render} from 'react-dom';

import App from './components/app/App';

import {Store} from 'webext-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}><App /></Provider>
    ,document.getElementById('app'));
});

