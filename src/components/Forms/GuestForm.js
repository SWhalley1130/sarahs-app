import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GuestForm({currentTrip, handleUpdatedTrip, setAddButton})
{
    const [formData, setFormData]=useState('')
    let param=useParams();
    let trip=JSON.parse(JSON.stringify(currentTrip));

    function handleSubmit(e)
    {
        e.preventDefault();
        trip.guests.push(formData);
        fetch(`https://my-server-npkp.onrender.com/trips/${param.id}`,
        {
            method:'PATCH',
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
                setAddButton('');
            })
    }


    return (
        <Form style={{marginLeft:'30px'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Guest</Form.Label>
                <Form.Control value={formData} onChange={e=>setFormData(e.target.value)} type="text" placeholder="ex: John Smith" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="info" type="submit">
                Submit
            </Button>
            <Button onClick={()=>setAddButton('')} variant="dark">Exit</Button>
        </Form>
    )
}

export default GuestForm;