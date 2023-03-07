import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import GuestForm from './Forms/GuestForm';
import DestinationForm from "./Forms/DestinationForm";
import FlightForm from './Forms/FlightForm';
import HotelForm from './Forms/HotelForm';
import ActivityForm from "./Forms/ActivityForm";
import {v4 as uuid} from 'uuid';

function DisplayTrip({upcomingTrips, handleUpdatedTrip})
{
    const param=useParams();

    console.log(param.id)
    const [addButton, setAddButton]=useState('');
    const [currentTrip, setCurrentTrip]=useState({});
    const [isLoaded, setIsLoaded]=useState(false);

    useEffect(()=>
    {
        fetch(`http://localhost:3000/trips/${param.id}`)
        .then(res=>res.json())
        .then(data=>
        {
            setCurrentTrip(data);
            setIsLoaded(true);
        })
    },[upcomingTrips])

   if (isLoaded) 
   {
        currentTrip.activities.sort((a,b)=>a.day-b.day)
   }
    

    function evalFormToUse()
    {
        if (addButton==='guest') return <GuestForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip} setAddButton={setAddButton}/>
        if (addButton==='destination') return <DestinationForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip} setAddButton={setAddButton}/>
        if (addButton==='flight') return <FlightForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip} setAddButton={setAddButton}/>
        if (addButton==='hotel') return <HotelForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip} setAddButton={setAddButton}/>
        if (addButton==='activity') return <ActivityForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip} setAddButton={setAddButton}/>
        
        else
        {
            return null;
        }
    }

    return (
        <>
            {isLoaded ?
            <>
                <TopBar>
                    <Button 
                        onClick={(e)=>setAddButton(e.target.name)}
                        name='guest' 
                        variant="info">
                            Add Guest
                    </Button>
                    <Button 
                        onClick={(e)=>setAddButton(e.target.name)}
                        name="destination"
                        variant="info" >
                            Add Destination
                    </Button>
                    <Button 
                        onClick={(e)=>setAddButton(e.target.name)}
                        name="flight"
                        variant="info" >
                            Add Flight
                    </Button>
                    <Button 
                        onClick={(e)=>setAddButton(e.target.name)}
                        name="hotel"
                        variant="info" >
                            Add Hotel
                    </Button>
                    <Button 
                        onClick={(e)=>setAddButton(e.target.name)}
                        name="activity"
                        variant="info" >
                            Add Activity
                    </Button>
                </TopBar>
                <Container>
                    <div style={{display:'flex',marginTop:'30px'}}>
                        <img style={{'width':'50%'}} src={currentTrip.image} alt="vacation"/>
                        {evalFormToUse()}
                    </div>
                    <h1>{currentTrip.name}</h1>
                    <h3>{currentTrip.description}</h3>
                    <h4>Guests:</h4>
                    <ul>
                        {currentTrip.guests.map(person=>
                            <li key={uuid()}>{person}</li>)}
                    </ul>
                    <h4>Destinations:</h4>
                    <ol>
                        {currentTrip.destinations.map(place=>
                            <li key={uuid()}>{place}</li>)}
                    </ol>
                    <h4>Flights:</h4>
                    <ul>
                        {currentTrip.flights.map(fl=>
                            <li key={uuid()}>Date: {fl.date} - Info: {fl.info}</li>)}
                    </ul>
                    <h4>Hotels:</h4>
                    <ul>
                        {currentTrip.hotels.map(hotel=>
                            <li key={uuid()}>Date: {hotel.date} - Info: {hotel.info}</li>)}
                    </ul>
                    <h4>Activities:</h4>
                    <ul>
                        {currentTrip.activities.map(thing=>
                            <li key={uuid()}>Day: {thing.day} - Info: {thing.info}</li>)}
                    </ul>
                </Container>
            </>
            :
            <TopBar>
            <h1>Loading...</h1>
            </TopBar>
            }
        </>
    )
}

export default DisplayTrip;