import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Airstream-webfont.eot';
import './aboutUsForStyle.js';
import registerServiceWorker from './registerServiceWorker';
import Main from './Main'

ReactDOM.render(
<Main/> , document.getElementById('root'));
registerServiceWorker();
