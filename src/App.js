import React from 'react';

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
// import {Route} from "react-router";

import './App.css';
import 'antd/dist/antd.css';

import Login from './Components/Login/Login';
import MainLayout from './Components/MainLayout/Layout';

let logstat = sessionStorage.getItem("login_status");
// let logstat = true;
if(logstat === 'true'){
    logstat = true;
} else {
    logstat = false
}

function App() {
    console.log("logstat" + logstat)
    function privateRoute() {
        return logstat ? <Route  path={'/'} component={MainLayout}/> : <Redirect to={ '/login'}/>
    }
    return (
        <div className="App">
            <Router>
                { !logstat &&  <Route path={'/'} component={Login}/>}
                <Route path={'/'} component={privateRoute}/>
                {/*<Route path={'/'} component={MainLayout}/>*/}
            </Router>
        </div>
    );
}

export default App;
