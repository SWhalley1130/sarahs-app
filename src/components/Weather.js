import React,{useEffect, useState} from "react";
import TopBar from './TopBar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import clear from "../images/clear.png";
import cloudy from "../images/cloudy.png";
import drizzle from "../images/drizzle.png";
import fog from "../images/fog.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import thunderstorm from "../images/thunderstorm.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Weather()
{
    let nav=useNavigate();
    const [isLoaded, setIsLoaded]=useState(false);
    const [currentWeather, setCurrentWeather]=useState({}); 
    const [dateIndex, setDateIndex]=useState(0);

    let imageSource;
    let weatherStatus;
    typeOfWeather();

    function typeOfWeather()
    {
        if(isLoaded)
        {
            let weatherCode=currentWeather.daily.weathercode[dateIndex];
            if (weatherCode===0)
            {
                weatherStatus="Clear";
                imageSource=clear;
            }
            else if (weatherCode===1 || weatherCode===2 || weatherCode===3 )
            {
                weatherStatus="Partly Cloudy";
                imageSource=cloudy;
            }
            else if (weatherCode===45 ||weatherCode===48)
            {
                weatherStatus='Fog';
                imageSource=fog;
            }
            else if (weatherCode===51 ||weatherCode===53||weatherCode===55 ||weatherCode===56 ||weatherCode===57)
            {
                weatherStatus="Drizzle";
                imageSource=drizzle;
            }
            else if (weatherCode===61||weatherCode===63||weatherCode===65||weatherCode===66||weatherCode===67||weatherCode===80||weatherCode===81||weatherCode===82)
            {
                weatherStatus="Rain";
                imageSource=rain;
            }
            else if (weatherCode===71 ||weatherCode===73 || weatherCode===77||weatherCode===85||weatherCode===86)
            {
                weatherStatus="Snow";
                imageSource=snow;
            }
            else if (weatherCode===95||weatherCode===96||weatherCode===99)
            {
                weatherStatus="Thunderstom";
                imageSource=thunderstorm;
            }
        }
    }

    useEffect(()=>
    {
        navigator.geolocation.getCurrentPosition(
            function(position) 
            {
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&timezone=MST&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_probability_mean&daily=weathercode`)
                .then(res=>res.json())
                .then(data=>
                {
                    setIsLoaded(true);
                    setCurrentWeather(data);
                });
            },
            function(error) 
            {
                console.error("Error Code = " + error.code + " - " + error.message);
            })
    },[]); 

    function formatTime(date)
    {
        let formatted=date.split('-');
        return (`Date: ${formatted[1]}-${formatted[2]}-${formatted[0]}`)
    }

    function convertToFahrenheit(n)
    {
        return ((n*(9/5))+32)
    }

    function handleChange(e)
    {
        setDateIndex(parseInt(e.target.value))
    }

    return (
        <>   
        {isLoaded ? 
            <>
            <TopBar>
                <Card.Title>Current Weather</Card.Title>
                <Button onClick={()=>nav(-1)} variant="secondary">Exit</Button>
            </TopBar>
            <Container>
                <Card style={{marginTop:'30px', textAlign:'center'}}>
                    <Form.Select value={dateIndex} onChange={handleChange}>
                        {currentWeather.daily.time.map((day,index)=>
                            <option value={index} key={day}>{formatTime(day)}</option>)}
                    </Form.Select>
                    <Card.Body>
                        <Card.Img src={imageSource} style={{maxWidth:'20%'}}/>
                        <Card.Title>{formatTime(currentWeather.daily.time[dateIndex])}</Card.Title>
                        <Card.Text><strong>High:</strong> {currentWeather.daily.temperature_2m_max[dateIndex].toFixed(2)}??C or {convertToFahrenheit(currentWeather.daily.temperature_2m_max[dateIndex]).toFixed(2)}??F</Card.Text>
                        <Card.Text><strong>Low:</strong> {currentWeather.daily.temperature_2m_min[dateIndex].toFixed(2)}??C or {convertToFahrenheit(currentWeather.daily.temperature_2m_min[dateIndex]).toFixed(2)}??F</Card.Text>
                        <Card.Text><strong>Chance of Precipitation:</strong> {currentWeather.daily.precipitation_probability_mean[dateIndex]}%</Card.Text>
                        <Card.Text><strong>Weather:</strong> {weatherStatus}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            </>
            :
            <TopBar>
                <Card.Title>Loading...</Card.Title>
            </TopBar>
        }
        </>
    )
}

export default Weather;