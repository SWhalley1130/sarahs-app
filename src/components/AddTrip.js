import React, {useState} from "react";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";


function AddTrip()
{
    const nav=useNavigate();
    const [guests,setGuests]=useState([]);
    const [destinations,setDestinations]=useState([]);
    const [formData, setFormData]=useState(
    {
        guest:'',
        destInfo:''
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
        destinations.push({day:destinations.length+1, info:formData.destInfo});
        setDestinations(destinations);
        setFormData({...formData, destInfo:''});
    }

    return (
        <>
            <TopBar>
                <Card.Title>Adding Trip</Card.Title>
                <Button onClick={()=>nav(-1)} variant="info">Exit</Button>
            </TopBar>

            <Container style={{marginTop:'30px'}}>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">

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
                        placeholder="Name of Destination" 
                        name='destInfo' 

                    />
                    <div>
                        <Button onClick={handleDestClick} variant="info">Add</Button> 
                        <ul>
                            {destinations.length>0 ? destinations.map(p=><li style={{display: 'inline-block', margin:'5px'}} key={uuid()}>• Day {p.day}: {p.info}</li>) : null}
                        </ul>
                    </div>

                </Form.Group>
            </Form>
            </Container>
        </>
    )
}

export default AddTrip;