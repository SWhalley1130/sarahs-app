import React from "react";
import {useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TopBar from "./TopBar";
import Row from 'react-bootstrap/Row';

function Homepage({upcomingTrips, handleDeletedTrip})
{
    const nav=useNavigate();

    function handleClick(trip)
    {
        nav(`/display_trip/${trip.id}`);
    }

    function handleDelete(e)
    {
        e.stopPropagation();
        if(window.confirm("Are you sure you want to delete this trip?"))
        {
            fetch(`https://my-server-npkp.onrender.com/trips/${parseInt(e.target.name)}`,
            {
                method: 'DELETE',
                headers:
                {
                    "Content-Type":'application/json',
                    "Accepts":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=> handleDeletedTrip(e.target.name))
        }
    } 

    return (
        <>
            <TopBar>
                <Card.Title>Home</Card.Title>
                <Button onClick={()=>nav('/add_trip')} variant="info">Add Trip</Button>
            </TopBar>
            <Container style={{marginTop:'30px'}}>
                <Row xs={1} md={2} className="g-4">
                {upcomingTrips.map(trip=>
                    <Card onClick={()=>handleClick(trip)} key={trip.id} style={{ width: '18rem' }}>
                        <Card.Img src={trip.image}/>
                        <Card.Body>
                            <Card.Title>{trip.name}</Card.Title>
                            <Card.Text>{trip.description}</Card.Text>
                        </Card.Body>
                        <Button name={trip.id} onClick={handleDelete} size='sm' variant="danger">Delete</Button>
                    </Card>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Homepage;