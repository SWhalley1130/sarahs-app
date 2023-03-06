import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import GuestForm from './Forms/GuestForm';
import {v4 as uuid} from 'uuid';

function DisplayTrip({upcomingTrips, handleUpdatedTrip})
{
    const param=useParams();
    let currentTrip=upcomingTrips.find(trip=>trip.id===parseInt(param.id))
    const [addButton, setAddButton]=useState('');

    function evalFormToUse()
    {
        if (addButton==='guest')
        {
            return <GuestForm handleUpdatedTrip={handleUpdatedTrip} currentTrip={currentTrip}/>
        }
        else
        {
            return null;
        }
    }


    return (
        <>
            <TopBar>
                <Button 
                    onClick={(e)=>setAddButton(e.target.name)}
                    name='guest' 
                    variant="info" 
                    style={{marginLeft:'50px'}}>
                        Add Guest
                </Button>
                <Button 
                    onClick={(e)=>setAddButton(e.target.name)}
                    name="destination"
                    variant="info" 
                    style={{marginLeft:'50px'}}>
                        Add Destination
                </Button>
                <Button 
                    onClick={(e)=>setAddButton(e.target.name)}
                    name="flight"
                    variant="info" 
                    style={{marginLeft:'50px'}}>
                        Add Flight
                </Button>
                <Button 
                    onClick={(e)=>setAddButton(e.target.name)}
                    name="activity"
                    variant="info" 
                    style={{marginLeft:'50px'}}>
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
                <h4>Activities:</h4>
                <ul>
                    {currentTrip.activities.map(thing=>
                        <li key={uuid()}>Day: {thing.day} - Info: {thing.info}</li>)}
                </ul>
            </Container>
        </>
    )
}

export default DisplayTrip;