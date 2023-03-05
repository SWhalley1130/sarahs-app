import '../misc-react-starter-code/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import AddTrip from "./AddTrip";
import Homepage from "./Homepage";
import DisplayTrip from "./DisplayTrip";
import { useEffect, useState } from 'react';
import TopBar from './TopBar';

function App() {

  const [upcomingTrips, setUpcomingTrips]=useState([])

  useEffect(()=>
  {
    fetch(`http://localhost:3000/trips`)
    .then(res=>res.json())
    .then(data=>setUpcomingTrips(data))
  },[])


  return (
    <div className="App">
        <Routes>
          <Route path="/add_trip" element={<AddTrip/>}/>
          <Route path="/display_trip/:id" element={<DisplayTrip/>}/>
          <Route exact path="/" element={<Homepage upcomingTrips={upcomingTrips}/>}/>
        </Routes>
    </div>
  );
}

export default App;
