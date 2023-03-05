import '../misc-react-starter-code/App.css';
import TopBar from "./TopBar";
import { Route, Routes } from "react-router-dom";
import AddTrip from "./AddTrip";
import Homepage from "./Homepage";
import DisplayTrip from "./DisplayTrip";

function App() {
  return (
    <div className="App">
        <TopBar />
        <Routes>
          <Route path="/add_trip" element={<AddTrip/>}/>
          <Route path="/display_trip" element={<DisplayTrip/>}/>
          <Route exact path="/" element={<Homepage/>}/>
        </Routes>
    </div>
  );
}

export default App;
