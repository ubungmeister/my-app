import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Provider} from "react-redux";
import store from "./store";
import  {createGlobalStyle} from "styled-components";

const  Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Calibri Light"
  }
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-size: 100vh ;
    background-image: linear-gradient(to bottom, #f5f0ff, #ebf8ff);
    color: #0B1C48;
  }
`
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Global/>
            <App/>
        </React.StrictMode>
    </Provider>
);