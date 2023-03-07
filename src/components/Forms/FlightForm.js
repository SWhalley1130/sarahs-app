import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"

function FlightForm({currentTrip, setAddButton, handleUpdatedTrip})
{
    const [formData, setFormData]=useState(
    {
        date:"",
        info:""
    })
    let param=useParams();
    let trip=JSON.parse(JSON.stringify(currentTrip));
    const nav=useNavigate();


    function handleChange(e)
    {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if (formData.date==='' || formData.info==='')
        {
            alert("Please enter information in all fields");
        }
        else 
        {
            trip.flights.push(formData);
            fetch(`http://localhost:3000/trips/${param.id}`,
            {
                method: 'PATCH',
                headers:
                {
                    "Content-Type":'application/json',
                    "Accepts":"application/json"
                },
                body: JSON.stringify(trip)
            })
            .then(res=>res.json())
            .then(updatedTrip=>
            {
                handleUpdatedTrip(updatedTrip);
                nav(`/display_trip/${updatedTrip.id}`);
                setAddButton('');
            })
        }
    }

    return (
        <Form style={{marginLeft:'30px'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Flight</Form.Label>
                <Form.Control value={formData.date} onChange={e=>handleChange(e)} name="date" type="date" />
                <Form.Control value={formData.info} onChange={e=>handleChange(e)} name="info" type="text" placeholder="ex: DEN to PHL" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="info" type="submit">
                Submit
            </Button>
            <Button onClick={()=>setAddButton('')} variant="dark">Exit</Button>
        </Form>
    )
}

export default FlightForm;