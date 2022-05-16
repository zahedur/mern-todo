import React, {useState} from "react";
import Layout from "./layouts/layout";
import '../src/assets/css/style.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "./store/TodoContext";
import {ToastContainer} from "react-toastify";

const App = () => {

    return (
        <Provider>
            <Layout />
            <ToastContainer />
        </Provider>

);

}



export default App;
