import React, {useState, useEffect} from "react";
import TopBar from "./TopBar";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function EditMode()
{
    const param=useParams();
    const [isLoaded, setIsLoaded]=useState(false);
    const [edittingTrip, setEdittingTrip]=useState({});
    const [state, setState]=useState('');

    useEffect(()=>
    {
        fetch(`http://localhost:3000/trips/${param.id}`)
        .then(res=>res.json())
        .then(data=>
        {
            setEdittingTrip(data);
            setIsLoaded(true);
        })
    },[])

    function handleChange(e, index)
    {
        if (e.target.name.includes('destinations'))
        {
            let n=e.target.name; 
            let v=e.target.value;
             
            //setEdittingTrip({...edittingTrip, edittingTrip.destinations[index]=v)
        }
        else
        {
            setEdittingTrip({...edittingTrip, [e.target.name]:e.target.value})
        }
    }

    console.log(edittingTrip)
    return (
        <>
            <TopBar >
                <Card.Title>Edit Mode</Card.Title>
            </TopBar>
            {isLoaded?
            <Container style={{marginTop:'30px', maxWidth:'50%'}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><strong>Change Name</strong></Form.Label>
                    <Form.Control value={edittingTrip.name} onChange={handleChange} type="text" name='name' />
                    <br/>

                    <Form.Label><strong>Change Description</strong></Form.Label>
                    <Form.Control value={edittingTrip.description} onChange={handleChange} type="text" name='description' />
                    <br/> 

                    <Form.Label><strong>Change Image URL</strong></Form.Label>
                    <Form.Control value={edittingTrip.image} onChange={handleChange} type="text" name='image' />
                    <br/>

                    <Form.Label><strong>Change Destinations</strong></Form.Label>
                    { 
                        edittingTrip.destinations.map((place,index)=>
                                <Form.Control value={place} onChange={e=>handleChange(e, index)} type='text' name={`destinations`}  />
                            )
                    }
                
                </Form.Group>
            </Form>
            </Container>
                :
                <h3>Loading...</h3>
            }
        </>
    );
};

export default EditMode;