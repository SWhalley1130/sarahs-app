import React from "react";
import TopBar from "./TopBar";
import Card from 'react-bootstrap/Card';

function EditMode()
{
    return (
        <>
            <TopBar >
                <Card.Title>Edit Mode</Card.Title>
            </TopBar>
        </>
    );
};

export default EditMode;