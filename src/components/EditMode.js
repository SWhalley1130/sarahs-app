import React, {useState, useEffect} from "react";
import TopBar from "./TopBar";
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {v4 as uuid} from 'uuid';

function EditMode({handleUpdatedTrip})
{
    const param=useParams();
    const nav=useNavigate();
    const [isLoaded, setIsLoaded]=useState(false);
    const [edittingTrip, setEdittingTrip]=useState({});

    useEffect(()=>
    {
        fetch(`https://my-server-npkp.onrender.com/trips/${param.id}`)
        .then(res=>res.json())
        .then(data=>
        {
            setEdittingTrip(data);
            setIsLoaded(true);
        })
    },[]);

    function handleChange(e, index)
    {
        if (e.target.name.includes('destinations'))
        {
            edittingTrip.destinations[index]=e.target.value;
            setEdittingTrip({...edittingTrip})
        }
        else if (e.target.name.includes('guests'))
        {
            edittingTrip.guests[index]=e.target.value;
            setEdittingTrip({...edittingTrip})
        }
        else if (e.target.name.includes('cruisePrice'))
        {
            let num;
            e.target.value==="" ? num=0 : num = parseFloat(e.target.value);
            edittingTrip.cruisePrice=num; 
            setEdittingTrip({...edittingTrip});
        }
        else if (e.target.name.includes('budget'))
        {
            let num;
            e.target.value==="" ? num=0 : num = parseFloat(e.target.value);
            edittingTrip.budget=num; 
            setEdittingTrip({...edittingTrip});
        }
        else
        {
            setEdittingTrip({...edittingTrip, [e.target.name]:e.target.value})
        }
    };

    function handleTwoChange(e, index)
    {
        let deepCopy=JSON.parse(JSON.stringify(edittingTrip));
        if (e.target.name.includes('flights date')) 
        {
            deepCopy.flights[index].date=e.target.value;
        }
        else if (e.target.name.includes('flights info'))
        {
            deepCopy.flights[index].info=e.target.value;
        }
        else if (e.target.name.includes('hotels info'))
        {
            deepCopy.hotels[index].info=e.target.value;
        }
        else if (e.target.name.includes('hotels date'))
        {
            deepCopy.hotels[index].date=e.target.value;
        }
        else if (e.target.name.includes('activities day'))
        {
            deepCopy.activities[index].day=e.target.value;
        }
        else if (e.target.name.includes('activities info'))
        {
            deepCopy.activities[index].info=e.target.value;
        }
        setEdittingTrip(deepCopy);
    };

    function handleSubmit(e)
    {
        e.preventDefault();
        fetch(`https://my-server-npkp.onrender.com/trips/${param.id}`,
        {
            method: 'PATCH',
            headers:
            {
                "Content-Type":'application/json',
                "Accepts":"application/json"
            },
            body: JSON.stringify(edittingTrip)
        })
        .then(res=>res.json())
        .then(data=>
        {
            handleUpdatedTrip(data);
            nav(`/display_trip/${param.id}`);
        })
    };

    function handleDelete(e,i)
    {
        let deepCopy=JSON.parse(JSON.stringify(edittingTrip));
        if (e.target.name==="guests")
        {
            deepCopy.guests.splice(i, 1);
        }
        else if (e.target.name==='destinations')
        {
            deepCopy.destinations.splice(i, 1);
        }
        else if (e.target.name==='activities')
        {
            deepCopy.activities.splice(i, 1);
        }
        else if (e.target.name==='flights')
        {
            deepCopy.flights.splice(i, 1);
        }
        else if (e.target.name==='hotels')
        {
            deepCopy.hotels.splice(i, 1);
        }
        setEdittingTrip(deepCopy);
    };

    return (
        <>
            {isLoaded?
            <>
             <TopBar >
                <Card.Title>Edit Mode</Card.Title>
                <Button onClick={()=>nav(-1)} variant="secondary">Exit</Button>
            </TopBar>
            <Container style={{marginTop:'30px', maxWidth:'50%'}}>
            <Form>
                <Form.Group required={true} className="mb-3">
                    <Form.Label><strong>Change Name</strong></Form.Label>
                    <Form.Control value={edittingTrip.name} onChange={handleChange} type="text" name='name' />
                    <br/>

                    <Form.Label><strong>Change Description</strong></Form.Label>
                    <Form.Control value={edittingTrip.description} onChange={handleChange} type="text" name='description' required/>
                    <br/> 

                    <Form.Label><strong>Change Base Price</strong></Form.Label>
                    <Form.Control value={edittingTrip.cruisePrice} onChange={handleChange} type="number" name='cruisePrice' required/>
                    <br/> 

                    <Form.Label><strong>Change Budget</strong></Form.Label>
                    <Form.Control value={edittingTrip.budget} onChange={handleChange} type="text" name='budget' required/>
                    <br/> 

                    <Form.Label><strong>Change Image URL</strong></Form.Label>
                    <Form.Control value={edittingTrip.image} onChange={handleChange} type="text" name='image' required/>
                    <br/>

                    <Form.Label><strong>Change Guests</strong></Form.Label>
                    { 
                        edittingTrip.guests.map((person,index)=>
                            <InputGroup key={index}>
                                <Button name='guests' onClick={e=>handleDelete(e, index)} variant="danger">Delete</Button>
                                <Form.Control value={person} onChange={e=>handleChange(e, index)} type='text' name='guests'  required/>
                            </InputGroup>
                            )
                    }
                    <br/>

                    <Form.Label><strong>Change Destinations</strong></Form.Label>
                    { 
                        edittingTrip.destinations.map((place,index)=>
                            <InputGroup key={`${index}`}>
                                <Button name='destinations' onClick={e=>handleDelete(e, index)}  variant="danger">Delete</Button>
                                <Form.Control value={place} onChange={e=>handleChange(e, index)} type='text' name='destinations' required />
                            </InputGroup>
                            )
                    }
                    <br/>

                    <Form.Label><strong>Change Activities</strong></Form.Label>
                    {edittingTrip.activities.map((act,index)=>
                        <InputGroup key={index}>
                            <Button name='activities' onClick={e=>handleDelete(e, index)} variant="danger">Delete</Button>
                            <Form.Control id='1' value={act.day} onChange={e=>handleTwoChange(e, index)} type='number' name='activities day' required />
                            <Form.Control id='2' value={act.info} onChange={e=>handleTwoChange(e, index)} type='text' name='activities info' required />
                        </InputGroup>
                    )}
                    <br/>

                    <Form.Label><strong>Change Flights</strong></Form.Label>
                    {edittingTrip.flights.map((fl,index)=>
                        <InputGroup key={index}>
                            <Button name='flights' onClick={e=>handleDelete(e, index)} variant="danger">Delete</Button>
                            <Form.Control value={fl.date} onChange={e=>handleTwoChange(e, index)} type='date' name='flights date' required />
                            <Form.Control value={fl.info} onChange={e=>handleTwoChange(e, index)} type='text' name='flights info' required />
                        </InputGroup>
                    )}
                    <br/>

                    <Form.Label><strong>Change Hotels</strong></Form.Label>
                    {edittingTrip.hotels.map((ho,index)=>
                        <InputGroup key={index}>
                            <Button name='hotels' onClick={e=>handleDelete(e, index)} variant="danger">Delete</Button>
                            <Form.Control value={ho.date} onChange={e=>handleTwoChange(e, index)} type='date' name='hotels date' required />
                            <Form.Control value={ho.info} onChange={e=>handleTwoChange(e, index)} type='text' name='hotels info' required />
                        </InputGroup>
                    )}
                    <br/>

                    <div className="d-grid gap-2">
                    <Button onClick={handleSubmit} style={{background:'#0593b0', border:"#0593b0"}} variant="success" type="submit" size='lg'>Submit</Button>
                    </div>

                </Form.Group>
            </Form>
            </Container>
            </>
                :
                <TopBar>
                <Card.Title>Loading...</Card.Title>
                </TopBar>
            }
        </>
    );
};

export default EditMode;