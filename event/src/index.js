import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'webext-redux';

const store = createStore(rootReducer, {});

wrapStore(store);
