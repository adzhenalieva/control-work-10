import React from 'react';
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import {Button, Card, CardBody} from "reactstrap";

const FullNewsItem = props =>{
    return (
        <Card body outline color="warning" style={{marginBottom: '10px'}}>
            <CardBody>
            <h2>{props.title} </h2>
            <p>{props.date}</p>
            <NewsThumbnail image={props.image}/>
            <p>{props.description}</p>
            <Button className="mb-4" color="warning"  onClick={props.delete}>Delete</Button>
            </CardBody>
        </Card>
    );
};

export default FullNewsItem;