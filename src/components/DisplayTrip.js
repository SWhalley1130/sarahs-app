import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import {useParams, useNavigate} from "react-router-dom";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import GuestForm from './Forms/GuestForm';
import DestinationForm from "./Forms/DestinationForm";
import FlightForm from './Forms/FlightForm';
import HotelForm from './Forms/HotelForm';
import ActivityForm from "./Forms/ActivityForm";
import {v4 as uuid} from 'uuid';
import Card from "react-bootstrap/Card";
import Table from 'react-bootstrap/Table'
import ProgressBar from "./ProgressBar";

function DisplayTrip({upcomingTrips, handleUpdatedTrip})
{
    const param=useParams();
    const nav=useNavigate();

    const [addButton, setAddButton]=useState('');
    const [currentTrip, setCurrentTrip]=useState({});
    const [isLoaded, setIsLoaded]=useState(false);

    useEffect(()=>
    {
        fetch(`https://my-server-npkp.onrender.com/trips/${param.id}`)
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
        else {return null}
    }

    return (
        <>
            {isLoaded ?
            <>
                <TopBar>
                    <Card.Title>Detail View</Card.Title>
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
                    <Button 
                        onClick={(e)=>nav(`/edit/${param.id}`)}
                        variant="warning">
                       Edit Mode
                    </Button>
                </TopBar>
                <Container>
                    <div style={{display:'flex',marginTop:'30px'}}>
                        <img style={{'width':'50%'}} src={currentTrip.image} alt="vacation"/>
                        {evalFormToUse()}
                    </div>
                    <h1>{currentTrip.name}</h1>
                    <ProgressBar trip={currentTrip}/>
                    <h3>{currentTrip.description}</h3>
                    <h5>Base Cost of Cruise: ${currentTrip.cruisePrice}</h5>
                    <h4>Guests:</h4>
                    <ul>
                        {currentTrip.guests.map(person=>
                            <li key={uuid()}>{person}</li>)}
                    </ul>
                    <h4>Destinations:</h4>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Stop</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrip.destinations.map((destination,index)=>
                                <tr key={uuid()}>
                                    <td>{index+1}</td>
                                    <td>{destination}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                    {currentTrip.activities.length>0 ?
                        <>
                            <h4>Activities:</h4>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Activity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrip.activities.map((activity)=>
                                        <tr key={uuid()}>
                                            <td>{activity.day}</td>
                                            <td>{activity.info}</td>
                                            <td>${activity.price}</td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </>
                        : null}
                    {currentTrip.flights.length>0 ? 
                        <>
                            <h4>Flights:</h4>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Flight Information</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrip.flights.map(flight=>
                                        <tr key={uuid()}>
                                            <td>{flight.date}</td>
                                            <td>{flight.info}</td>
                                            <td>${flight.price}</td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </>
                        : null}
                    {currentTrip.hotels.length>0 ?
                        <>
                            <h4>Hotels:</h4>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Hotel</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrip.hotels.map(hotel=>
                                        <tr key={uuid()}>
                                            <td>{hotel.date}</td>
                                            <td>{hotel.info}</td>
                                            <td>${hotel.price}</td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </> 
                        : null}
                </Container>
            </>
            :
            <TopBar>
                <Card.Title>Loading...</Card.Title>
            </TopBar>
            }
        </>
    )
}

export default DisplayTrip;