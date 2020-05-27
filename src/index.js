import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from "rsuite";
import ruLocale from "./ruLocale";
import 'rsuite/dist/styles/rsuite-default.css'
import './index.css'

ReactDOM.render(
    <IntlProvider locale={ruLocale}>
        <App/>
    </IntlProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
