import React from 'react';
import { BirthdayRoom } from './components/birthdayRoom';
import './App.scss';
const params = new URLSearchParams(window.location.search);
const meetingId = params.get('id') ?? 'randomBirthday';
function App() {
  return (
    <div className="app">
      <BirthdayRoom meetingId={meetingId}/>
    </div>
  );
}

export default App;
