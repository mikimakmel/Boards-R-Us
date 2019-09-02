import React from 'react';
import ReactDOM from 'react-dom';
import Gmail from './components/gmailLogin.js';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Gmail/>, document.getElementById('root')
)

serviceWorker.unregister();