import React from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import TopBar from "./TopBar";
import { useEffect } from "react";

function DisplayTrip()
{
    const param=useParams();

    useEffect(()=>
    {
      fetch(`http://localhost:3000/trips/${param.id}`)
      .then(res=>res.json())
      .then(data=>console.log(data))
    },[])

    return (
        <>
            <TopBar />
            <Container>
                <h1>DISPLAY TRIP</h1>
            </Container>
        </>
    )
}

export default DisplayTrip;