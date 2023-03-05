import React from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import TopBar from "./TopBar";
import { useEffect,useState } from "react";

function DisplayTrip({upcomingTrips})
{
    const param=useParams();
    let currentTrip=upcomingTrips.find(trip=>trip.id===parseInt(param.id))

    console.log(currentTrip);

    useEffect(()=>
    {
      fetch(`http://localhost:3000/trips/${param.id}`)
      .then(res=>res.json())
      .then(data=>content(data))
    },[])

    function content(data)
    {
        return (
            <Container>
                <p>{data.name}</p>
            </Container>
        )
    }

    return (
        <>
            <TopBar />
            
        </>
    )
}

export default DisplayTrip;