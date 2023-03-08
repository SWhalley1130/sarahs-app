import '../misc-react-starter-code/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import AddTrip from "./AddTrip";
import Homepage from "./Homepage";
import DisplayTrip from "./DisplayTrip";
import EditMode from './EditMode';
import Weather from './Weather';
import { useEffect, useState } from 'react';

function App() {
  const [upcomingTrips, setUpcomingTrips]=useState([]);

  useEffect(()=>
  {
    fetch(`https://my-server-npkp.onrender.com/trips`)
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
          <Route exact path="/edit/:id" element={<EditMode handleUpdatedTrip={handleUpdatedTrip}/>} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
    </div>
  );
}

export default App;
