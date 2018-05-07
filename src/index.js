import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers/reducer';
import { App, Home, NewTask} from './containers';

import './style/css/main.css';

const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<HashRouter>
			<App>
				<Route exact path="/" component={Home} />
        <Route path="/new_task" component={NewTask} />
			</App>
		</HashRouter>
	</Provider>,
	document.getElementById('app'),
);
