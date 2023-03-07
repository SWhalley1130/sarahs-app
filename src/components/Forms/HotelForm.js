import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"

function HotelForm({currentTrip, setAddButton, handleUpdatedTrip})
{
    const [formData, setFormData]=useState(
    {
        date:"",
        info:""
    })
    let param=useParams();
    let trip=JSON.parse(JSON.stringify(currentTrip));
    const nav=useNavigate();

    function handleSubmit(e)
    {
        e.preventDefault();
    }

    return (
        <Form style={{marginLeft:'30px'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Hotel</Form.Label>
                <Form.Control value={formData.date} onChange={e=>console.log(e.target.value)} type="date" />
                <Form.Control value={formData.info} onChange={e=>console.log(e.target.value)} type="text" placeholder="ex: Holiday Inn" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="info" type="submit">
                Submit
            </Button>
            <Button onClick={()=>setAddButton('')} variant="dark">Exit</Button>
        </Form>
    )
}

export default HotelForm;