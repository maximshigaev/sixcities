import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store.js';
import App from './components/app/app.jsx';
import ErrorBoundary from './components/errorBoundary/errorBoundary.jsx';

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundary>
			<Router>
				<App />
			</Router>
		</ErrorBoundary>
	</Provider>,
	document.querySelector(`#root`)
);
