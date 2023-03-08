import React from "react";

function ProgressBar({trip})
{
    let sum=trip.cruisePrice;
            trip.flights.forEach(fl=>sum=sum+fl.price);
            trip.hotels.forEach(ho=>sum=sum+ho.price);
            trip.activities.forEach(act=>sum=sum+act.price);
    
            let percent=((sum/trip.budget)*100)
    
            const containerStyles = {
                height: 20,
                width: '100%',
                backgroundColor: "#e0e0de",
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 10
              }
            
              const fillerStyles = {
                height: '100%',
                width: `${percent}%`,
                backgroundColor: '#6ab89e',
                borderRadius: 'inherit',
                textAlign: 'center'
              }
            
              const labelStyles = {
                paddingRight: 10,
                color: 'white',
                fontWeight: 'bold'
              }

    return (

        <div style={containerStyles}>
            <div style={fillerStyles}>
                <div style={labelStyles}>${sum}</div>
            </div>
        </div>
    )
}

export default ProgressBar;