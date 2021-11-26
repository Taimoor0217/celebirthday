import React from 'react';
import { BirthdayRoom } from './components/birthdayRoom';
import './App.scss';
import Router from '../src/containers/Router';
const params = new URLSearchParams(window.location.search);
const meetingId = params.get('id') ?? 'randomBirthday';
function App() {
  return (
    <div className="app">
      {/* <BirthdayRoom meetingId={meetingId}/> */}
      <Router />
    </div>
  );
}

export default App;
