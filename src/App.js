import React from 'react';
import { BirthdayRoom } from './components/birthdayRoom';
import './App.css';
const params = new URLSearchParams(window.location.search);
const cell = params.get('cell') || 'test1234';
function App() {
  return (
    <div className="App">
      <BirthdayRoom cell={cell}/>
    </div>
  );
}

export default App;
