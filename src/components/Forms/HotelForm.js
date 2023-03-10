import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function HotelForm({currentTrip, setAddButton, handleUpdatedTrip})
{
    const [formData, setFormData]=useState(
    {
        date:"",
        info:"",
        price:""
    })

    let param=useParams();
    let trip=JSON.parse(JSON.stringify(currentTrip));

    function handleChange(e)
    {
        if (e.target.name==="price") 
        {
            setFormData({...formData, [e.target.name]:parseFloat(e.target.value)});
        }
        else
        {
            setFormData({...formData, [e.target.name]:e.target.value});
        }
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
            trip.hotels.push(formData);
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
                <Form.Label>Add Hotel</Form.Label>
                <Form.Control value={formData.date} onChange={e=>handleChange(e)} name='date' type="date" />
                <Form.Control value={formData.info} onChange={e=>handleChange(e)} name='info' type="text" placeholder="ex: Holiday Inn" />
                <Form.Control value={formData.price} onChange={e=>handleChange(e)} name='price' type="number" placeholder="Price" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="info" type="submit">
                Submit
            </Button>
            <Button onClick={()=>setAddButton('')} variant="dark">Exit</Button>
        </Form>
    )
}

export default HotelForm;