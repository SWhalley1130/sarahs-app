import React, {useState} from "react";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";


function AddTrip({setUpcomingTrips, upcomingTrips})
{
    const nav=useNavigate();
    const [guests,setGuests]=useState([]);
    const [destinations,setDestinations]=useState([]);
    const [flights, setFlights]=useState([]);
    const [hotels, setHotels]=useState([]);
    const [activities, setActivities]=useState([]);
    const [formData, setFormData]=useState(
    {
        name:'',
        description:'',
        URL:'',
        guest:'',
        destInfo:'',
        flDate:'',
        flInfo:'',
        hoDate:'',
        hoInfo:'',
        actDay:'',
        actInfo:''
    });
    
    function handleChange(e)
    {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleGuestClick()
    {
        guests.push(formData.guest)
        setGuests(guests);
        setFormData({...formData, guest:''})
    }

    function handleDestClick()
    {
        destinations.push(formData.destInfo);
        setDestinations(destinations);
        setFormData({...formData, destInfo:''});
    }

    function handleFlClick()
    {
        flights.push({date: formData.flDate, info: formData.flInfo});
        setFlights(flights);
        setFormData({...formData, flDate:'', flInfo:''});
    }

    function handleHoClick()
    {
        hotels.push({date: formData.hoDate, info: formData.hoInfo});
        setHotels(hotels);
        setFormData({...formData, hoDate:'', hoInfo:''});
    }

    function handleActClick()
    {
        activities.push({day: formData.actDay, info: formData.actInfo});
        setActivities(activities);
        setFormData({...formData, actDay:'', actInfo:''});
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        let newTrip=
        {
            name:formData.name, 
            description:formData.description,
            image:formData.URL,
            guests:guests,
            destinations:destinations, 
            flights:flights, 
            hotels:hotels, 
            activities: activities
        };
        fetch(`http://localhost:3000/trips`,
        {
            method: 'POST',
            headers:
            {
                "Content-Type":'application/json',
                "Accepts":"application/json"
            },
            body: JSON.stringify(newTrip)
        })
        .then(res=>res.json())
        .then(data=>
        {
            setUpcomingTrips([...upcomingTrips, data]);
            nav(`/display_trip/${data.id}`);
        })
    }

    return (
        <>
            <TopBar>
                <Card.Title>Adding Trip</Card.Title>
                <Button onClick={()=>nav(-1)} variant="secondary">Exit</Button>
            </TopBar>

            <Container style={{marginTop:'30px', maxWidth:'50%'}}>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label><strong>Trip Title</strong></Form.Label>
                    <Form.Control value={formData.name} name='name' onChange={handleChange} type="text" placeholder="ex: Beach Party" />
                    <br/>

                    <Form.Label><strong>Trip Description</strong></Form.Label>
                    <Form.Control value={formData.description} name='description' onChange={handleChange} type="text" placeholder="ex: Sightseeing in the bay" />
                    <br/>

                    <Form.Label><strong>Trip Image URL</strong></Form.Label>
                    <Form.Control value={formData.URL} name='URL' onChange={handleChange} type="text" placeholder="ex: www.google.com/images" />
                    <br/>

                    <Form.Label><strong>Add Guests</strong></Form.Label>
                    <Form.Control 
                        value={formData.guest} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="example: John Smith" 
                        name="guest"
                    />
                    <div>
                        <Button onClick={handleGuestClick} variant="info">Add</Button> 
                        <ul>
                            {guests.length>0 ? guests.map(p=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• {p}</li>) : null}
                        </ul>
                    </div>

                    <Form.Label><strong>Add Destination for Day {destinations.length+1}</strong></Form.Label>
                    <Form.Control 
                        value={formData.destInfo} 
                        onChange={handleChange}
                        type="text" 
                        placeholder="ex: Miami, FL" 
                        name='destInfo' 

                    />
                    <div>
                        <Button onClick={handleDestClick} variant="info">Add</Button> 
                        <ul>
                            {destinations.length>0 ? destinations.map(p=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• Day {p.day}: {p.info}</li>) : null}
                        </ul>
                    </div>

                    <Form.Label><strong>Add Flights</strong></Form.Label>
                    <Form.Control value={formData.flDate} onChange={e=>handleChange(e)} name="flDate" type="date" />
                    <Form.Control value={formData.flInfo} onChange={e=>handleChange(e)} name="flInfo" type="text" placeholder="ex: DEN to PHL" />
                    <div>
                        <Button onClick={handleFlClick} variant="info">Add</Button> 
                        <ul>
                            {flights.length>0 ? flights.map(fl=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• Date: {fl.date}, {fl.info}</li>) : null}
                        </ul>
                    </div>

                    
                    <Form.Label><strong>Add Hotels</strong></Form.Label>
                    <Form.Control value={formData.hoDate} onChange={e=>handleChange(e)} name="hoDate" type="date" />
                    <Form.Control value={formData.hoInfo} onChange={e=>handleChange(e)} name="hoInfo" type="text" placeholder="ex: Holiday Inn" />
                    <div>
                        <Button onClick={handleHoClick} variant="info">Add</Button> 
                        <ul>
                            {hotels.length>0 ? hotels.map(ho=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• Date: {ho.date}, {ho.info}</li>) : null}
                        </ul>
                    </div>

                    <Form.Label><strong>Add Activities</strong></Form.Label>
                    <Form.Control value={formData.actDay} onChange={handleChange} type="number" placeholder="Day" name='actDay'/>
                    <Form.Control value={formData.actInfo} onChange={handleChange} type="text" placeholder="ex: Nature Tour" name='actInfo' />
                    <div>
                        <Button onClick={handleActClick} variant="info">Add</Button> 
                        <ul>
                            {activities.length>0 ? activities.map(act=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• Day: {act.day}, {act.info}</li>) : null}
                        </ul>
                    </div>
                    <div className="d-grid gap-2">
                    <Button onClick={handleSubmit} style={{background:'#0593b0', border:"#0593b0"}} variant="success" type="submit" size='lg'>Submit</Button>
                    </div>
                </Form.Group>
            </Form>
            </Container>
        </>
    )
}

export default AddTrip;