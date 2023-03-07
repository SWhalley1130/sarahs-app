import '../misc-react-starter-code/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import AddTrip from "./AddTrip";
import Homepage from "./Homepage";
import DisplayTrip from "./DisplayTrip";
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


  return (
    <div className="App">
        <Routes>
          <Route path="/add_trip" element={<AddTrip/>}/>
          <Route path="/display_trip/:id" element={<DisplayTrip handleUpdatedTrip={handleUpdatedTrip} upcomingTrips={upcomingTrips}/>}/>
          <Route exact path="/" element={<Homepage upcomingTrips={upcomingTrips}/>}/>
        </Routes>
    </div>
  );
}

export default App;
