import '../misc-react-starter-code/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import AddTrip from "./AddTrip";
import Homepage from "./Homepage";
import DisplayTrip from "./DisplayTrip";
import EditMode from './EditMode';
import { useEffect, useState } from 'react';

function App() {
  const [upcomingTrips, setUpcomingTrips]=useState([]);

  useEffect(()=>
  {
    fetch(`http://localhost:3000/trips`)
    .then(res=>res.json())
    .then(data=>
    {
      setUpcomingTrips(data);
    })
  },[]);

  function handleUpdatedTrip(updatedTrip)
  {
    let newArray=JSON.parse(JSON.stringify(upcomingTrips));
    newArray.splice((updatedTrip.id-1),1, updatedTrip);
    setUpcomingTrips(newArray);
  }

  function handleDeletedTrip(id)
  {
    setUpcomingTrips(upcomingTrips.filter(trip=>trip.id!==parseInt(id)));
  }


  return (
    <div className="App">
        <Routes> 
          <Route path="/add_trip" element={<AddTrip upcomingTrips={upcomingTrips} setUpcomingTrips={setUpcomingTrips}/>}/>
          <Route path="/display_trip/:id" element={<DisplayTrip handleUpdatedTrip={handleUpdatedTrip} upcomingTrips={upcomingTrips}/>}/>
          <Route exact path="/" element={<Homepage handleDeletedTrip={handleDeletedTrip} upcomingTrips={upcomingTrips}/>}/>
          <Route exact path="/edit_mode/:id" element={<EditMode/>} />
        </Routes>
    </div>
  );
}

export default App;
