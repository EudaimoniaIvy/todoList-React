import './App.css';
import MyHeader from './components/MyHeader'
import List from './components/List'
import MyFooter from './components/MyFooter'
import React from 'react';

function App() {
    return (
        <div className="container">
            <div className="wrap">
                <MyHeader />
                <List />
                <MyFooter/>
            </div>
        </div>
    );
}

export default App;
