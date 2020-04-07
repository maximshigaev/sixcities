import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

fetch(`https://htmlacademy-react-3.appspot.com/six-cities`)
	.then((res) => res.json())
	.then((data) => console.log(data))

ReactDOM.render(
	<App onClick={() => {alert(`dsd`)}}/>,
	document.querySelector(`#root`)
);
