import React from 'react';
import logo from './logo.svg';
import './App.css';

import ByeWorld from './components/decorator/ByeWorld';
import RefDemoComponent from './components/ref/index';
import HijackComponent from './components/hijack/index';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HijackComponent name="xcharset" />
            </header>
        </div>
    );
}

export default App;
