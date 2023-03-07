import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function DestinationForm({currentTrip, setAddButton, handleUpdatedTrip})
{
    const [formData, setFormData]=useState(
    {
        day:'',
        info:''
    })
    let param=useParams();
    let trip=JSON.parse(JSON.stringify(currentTrip));

    function handleChange(e)
    {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if (formData.day<1 || formData.day>(trip.destinations.length+1))
        {
            alert(`Please enter a day between 1 and ${trip.destinations.length+1}`);
        }
        else
        {
            trip.destinations.splice((formData.day-1),0, formData.info);
            fetch(`https://my-server-npkp.onrender.com/trips/${param.id}`,
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
                setAddButton('');
            })
        }
    }
    


    return (
        <Form style={{marginLeft:'30px'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Destination</Form.Label>
                <Form.Control value={formData.day} onChange={handleChange} type="number" min="1" placeholder="Day of Trip" name='day'/>
                <Form.Control value={formData.info} onChange={handleChange} type="text" placeholder="Name of Destination" name='info' />
            </Form.Group>
            <Button onClick={handleSubmit} variant="info" type="submit">
                Submit
            </Button>
            <Button onClick={()=>setAddButton('')} variant="dark">Exit</Button>
        </Form>
    )
}

export default DestinationForm;
